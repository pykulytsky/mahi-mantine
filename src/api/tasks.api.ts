import { Task, TaskReorder } from "../types"
import http from "./axios"

const BASE_URL = "/tasks/"

export const reorder = async (reorder: TaskReorder): Promise<Task> => {
  const { data } = await http.post<Task>(
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
