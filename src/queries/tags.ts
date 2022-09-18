import { useQuery } from "@tanstack/react-query"
import { fetchUserTags } from "../api/tags.api"
import { Tag } from "../types"

export const ownTagsQuery = () => ({
  queryKey: ["tags", "user"],
  queryFn: fetchUserTags
})

export function useTags() {
  return useQuery<Tag[]>(ownTagsQuery())
}
