import { Project, Task, TaskEdit, TaskReorder } from "../types"
import http from "./axios"

const BASE_URL = "/tasks/"

export const reorder = async (reorder: TaskReorder): Promise<Project> => {
  const { data } = await http.post<Project>(
    `${BASE_URL}${reorder.sourceOrder}/reorder/`,
    {
      source_id: reorder.sourceID,
      destination_id: reorder.destinitionID,
      destination_type: reorder.destinationType,
      order: reorder.destinationOrder,
      source_type: reorder.sourceType,
    }
  )

  return data
}

export const getTask = async (ID: number | string): Promise<Task> => {
  const { data } = await http.get<Task>(BASE_URL + ID)
  return data
}

export const editTask = async (task: TaskEdit): Promise<Task> => {
  const { data } = await http.patch<Task>(BASE_URL + task.id, {
    ...task,
  })
  return data
}