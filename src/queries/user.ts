import { useQuery } from "@tanstack/react-query"
import { getMe } from "../api/user.api"
import { User } from "../types"

export const userQuery = () => ({
  queryKey: ["users", "me"],
  queryFn: getMe,
})

export function useUser() {
  return useQuery<User, any>(userQuery())
}
