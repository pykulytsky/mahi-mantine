import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchProject } from "../api/projects.api"
import { useParams } from "react-router-dom"
import { Container, createStyles } from "@mantine/core"
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
import Task from "../components/tasks/Task"
import { reorder } from "../api/tasks.api"
import { TaskReorder } from "../types"
import { useEffect, useMemo } from "react"

const useStyles = createStyles({})

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
    },
  })

  const { isEmpty, tasksCount } = useTasksHelper(data)

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
        tasksCount={tasksCount}
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
