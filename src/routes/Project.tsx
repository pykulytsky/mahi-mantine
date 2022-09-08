import { useQuery } from "@tanstack/react-query"
import { fetchProject } from "../api/projects.api"
import { useParams } from "react-router-dom"
import { Container } from "@mantine/core"
import ProjectHeader from "../components/tasks/ProjectHeader"
import {
  DragDropContext,
  Droppable,
  DraggableLocation,
  DropResult,
} from "@hello-pangea/dnd"

export default function ProjectRoot() {
  const { id } = useParams()
  const { data, isLoading, isError } = useQuery(
    ["project", id],
    async () => fetchProject(id),
    {
      retry: false,
    }
  )

  function orderProject(
    source: DraggableLocation,
    destination: DraggableLocation | null
  ): DropResult | void {}

  if (isLoading) return <h1>Loading project...</h1>
  if (isError) return <h1>Error...</h1>
  return (
    <Container>
      <ProjectHeader name={data.name} icon={data.icon} />
      <DragDropContext
        onDragEnd={({ source, destination }) =>
          orderProject(source, destination)
        }
      ></DragDropContext>
    </Container>
  )
}
