import { useQuery } from "@tanstack/react-query"
import { fetchProject, fetchUserProjects } from "../api/projects.api"
import { Project } from "../types"

export const ownProjectsQuery = () => ({
  queryKey: ["projects", "user"],
  queryFn: fetchUserProjects,
})

export function useOwnProjects() {
  return useQuery<Project[], any>(ownProjectsQuery())
}

export const projectQuery = (id: string | number) => ({
  queryKey: ["projects", { id }],
  queryFn: async () => fetchProject(id),
})

export function useProject(id: number | string) {
  return useQuery<Project, any>(projectQuery(id))
}
