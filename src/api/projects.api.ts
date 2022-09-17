import http from "./axios"
import { Project, ProjectEdit } from "../types"

const BASE_URL: string = "/projects/"

export const fetchUserProjects = async (): Promise<Project[]> => {
  const { data } = await http.get<Project[]>(BASE_URL + "user/")

  return data
}

export const fetchProject = async (
  ID: string | number | undefined
): Promise<Project> => {
  const { data } = await http.get<Project>(BASE_URL + ID)
  return data
}

export const editProject = async (project: ProjectEdit): Promise<Project> => {
  const { data } = await http.patch<Project>(BASE_URL + project.id, {
    ...project,
  })

  return data
}
