import { Tag, TagItem, TagItemCreate } from "../types"
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

export const applyTag = async (tag: TagItemCreate): Promise<TagItem> => {
  const { data } = await http.post<TagItem>("/tag_items/", {
    ...tag,
  })

  return data
}
