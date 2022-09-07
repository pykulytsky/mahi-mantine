import { useQuery } from "@tanstack/react-query"
import { fetchProject } from "../../api/projects.api"
import { useParams } from "react-router-dom"

export default function ProjectRoot() {
  const { id } = useParams()
  const { data, isLoading, isError } = useQuery(
    ["project"],
    async () => fetchProject(id),
    {
      retry: false,
    }
  )
  if (isLoading) return <h1>Loading project...</h1>
  if (isError) return <h1>Error...</h1>
  return (
    <div>
      <h1>{data.name}</h1>
      {data.tasks.map((task, index) => (
        <h1 key={index}>{task.name}</h1>
      ))}
    </div>
  )
}
