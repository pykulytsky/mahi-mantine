import http from "./axios"
import { User } from "../types"

export type UserList = {
  data: User[]
}

export type UserResposne = {
  data: User
}

const BASE_URL: string = "/users/"

export const getMe = async () => {
  const { data } = await http.get<User>(BASE_URL + "me/")
  return data
}

export const fetchUsers = async () => {
  const { data } = await http.get<User[]>(BASE_URL)
  return data
}

export const getUser = (ID: number | string) => http.get(BASE_URL + ID)
