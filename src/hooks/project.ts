import { useQuery } from "@tanstack/react-query"
import { fetchProject } from "../api/projects.api"

export function useProject(ID: number | string) {
  const projectQuery = useQuery(["project", ID], async () => fetchProject(ID))

  return {
    ...projectQuery,
    updateProject: () => {
      
    }
  }
}
