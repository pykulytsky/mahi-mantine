import {
  useMutation,
  useQuery,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query"
import { fetchProject } from "../api/projects.api"
import { useParams } from "react-router-dom"
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

const useStyles = createStyles({})

const projectRootQuery = (id: number) => ({
  queryKey: ["project", { id: id }],
  queryFn: async () => fetchProject(id),
})

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }) => {
    const query = projectRootQuery(params.id)

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    )
  }

export default function ProjectRoot() {
  const { id } = useParams()
  const { classes } = useStyles()
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery(
    ["project", { id: id }],
    async () => fetchProject(id)
  )
  const reorderMutation = useMutation(reorder, {
    onSuccess: (data) => {
      queryClient.setQueryData(["project", { id: id }], data)
      showNotification({
        title: "Project was successfully reordered.",
        message: undefined,
        icon: <IconArrowsSort size={18} />,
      })
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
