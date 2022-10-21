import http from "./axios"
import { Project, ProjectCreate, ProjectEdit, InvitationCode } from "../types"

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

export const createProject = async (
  project: ProjectCreate
): Promise<Project> => {
  const { data } = await http.post<Project>(BASE_URL, {
    ...project,
  })

  return data
}

export const generateInvitationCode = async (
  ID: number
): Promise<InvitationCode> => {
  const { data } = await http.get<InvitationCode>(`${BASE_URL}${ID}/invite`)

  return data
}
