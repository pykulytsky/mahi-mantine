import {
  useMutation,
  useQuery,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query"
import { fetchProject } from "../api/projects.api"
import { useParams, Params } from "react-router-dom"
import { Container, createStyles } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import ProjectHeader from "../components/tasks/ProjectHeader"
import {
  DragDropContext,
  Droppable,
  DraggableLocation,
  DropResult,
} from "@hello-pangea/dnd"
import { ProjectEmptyPlaceholder } from "../components/tasks/ProjectEmptyPlaceholder"
import SectionComponent from "../components/tasks/Section"
import useTasksHelper from "../hooks/tasksHelpers"
import { reorder } from "../api/tasks.api"
import { IconArrowsSort } from "@tabler/icons"
import { Project, TaskReorder } from "../types"

const useStyles = createStyles({})

const projectRootQuery = (id: string | undefined) => ({
  queryKey: ["project", { id }],
  queryFn: async () => fetchProject(id),
})

export const loader =
  (queryClient: QueryClient) =>
  async ({ params: Params }) => {
    return queryClient.getQueryData(["project", { id: params.id }])
  }

export default function ProjectRoot() {
  const { id } = useParams()
  const { classes } = useStyles()
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery(projectRootQuery(id))

  const reorderMutation = useMutation(reorder, {
    onSuccess: (data) => {
      showNotification({
        title: "Project was successfully reordered.",
        message: undefined,
        icon: <IconArrowsSort size={18} />,
      })
    },
    onMutate: async (reorderData: TaskReorder) => {
      await queryClient.cancelQueries(["project", { id }])
      let oldProject = queryClient.getQueryData<Project>(["project", { id }])

      let project = { ...oldProject }
      if (project) {
        let source =
          reorderData.sourceType == "project"
            ? project
            : project.sections?.find(
                (section) => section.id === Number(reorderData.sourceID)
              )
        let destinition =
          reorderData.destinationType === "project"
            ? project
            : project.sections?.find(
                (section) => section.id === Number(reorderData.destinitionID)
              )
        const task = source?.tasks?.splice(
          Number(reorderData.sourceOrder),
          1
        )[0]
        if (task) {
          task.order = 9999
          destinition?.tasks?.splice(
            Number(reorderData.destinationOrder),
            0,
            task
          )
        }
        queryClient.setQueryData(["project", { id }], project)

        return { oldProject, project }
      }
    },
    onError: (error, newProject, context) => {
      queryClient.setQueryData(["project", { id }], context?.oldProject)
    },
    onSettled: (data) => {
      queryClient.invalidateQueries(["project", { id }])
    },
  })

  const { isEmpty, projectTasksCount } = useTasksHelper(data)

  function orderProject(
    source: DraggableLocation,
    destination: DraggableLocation | null
  ): DropResult | void {
    if (destination?.droppableId === "droppableRoot") {
    } else if (destination && Number.isInteger(+destination?.droppableId)) {
      reorderMutation.mutate({
        sourceOrder: Number(source.index),
        sourceID:
          Number(source.droppableId) > 0 ? Number(source.droppableId) + 1 : id,
        destinitionID:
          Number(destination.droppableId) > 0
            ? Number(source.droppableId) + 1
            : id,
        destinationType:
          Number(destination.droppableId) >= 0 ? "section" : "project",
        destinationOrder: Number(destination.index),
        sourceType: Number(source.droppableId) >= 0 ? "section" : "project",
      })
    }
  }

  if (isLoading) return <></>
  if (isError) return <h1>Error...</h1>
  return (
    <Container>
      <ProjectHeader
        tasksCount={projectTasksCount}
        name={data.name}
        icon={data.icon}
      />
      {!isEmpty ? (
        <DragDropContext
          onDragEnd={({ source, destination }) =>
            orderProject(source, destination)
          }
        >
          <Droppable droppableId="droppableRoot" type="droppableItem">
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                {data.tasks.length > 0 && (
                  <SectionComponent tasks={data.tasks} index={0} />
                )}
                {data.sections.map((section, index) => (
                  <SectionComponent
                    key={index}
                    section={section}
                    index={index + 1}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <ProjectEmptyPlaceholder />
      )}
    </Container>
  )
}
