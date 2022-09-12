import http from "./axios"
import { User } from "../types"

export type UserList = {
  data: User[]
}

export type UserResposne = {
  data: User
}

const BASE_URL: string = "/users/"

export const getMe = async (): Promise<User> => {
  console.log("fetching current user...")
  const { data } = await http.get<User>(BASE_URL + "me/")
  return data
}

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await http.get<User[]>(BASE_URL)
  return data
}

export const getUser = async (ID: number | string): Promise<User> => {
  const { data } = await http.get(BASE_URL + ID)
  return data
}
