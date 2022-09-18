import { Tag } from "../types"
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
