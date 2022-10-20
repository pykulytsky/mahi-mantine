import { Tag, TagCreate, TagItem, TagItemCreate, Task } from "../types"
import http from "./axios"

const BASE_URL: string = "/tags/"

export const fetchUserTags = async (): Promise<Tag[]> => {
  const { data } = await http.get<Tag[]>(BASE_URL + "user/")

  return data
}

export const getTag = async (ID: string | number): Promise<Tag> => {
  const { data } = await http.get<Tag>(BASE_URL + ID)

  return data
}

export const applyTag = async (tag: TagItemCreate): Promise<Task> => {
  const { data } = await http.post<Task>(
    `/tasks/${tag.task_id}/tags/${tag.tag_id}`
  )

  return data
}

export const removeTag = async (tag: TagItemCreate): Promise<Task> => {
  const { data } = await http.post<Task>(
    `/tasks/${tag.task_id}/tags/${tag.tag_id}/remove`
  )

  return data
}

export const createTag = async (tag: TagCreate): Promise<Tag> => {
  const { data } = await http.post<Tag>(BASE_URL, {
    ...tag,
  })

  return data
}
