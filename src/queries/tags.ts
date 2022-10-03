import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchUserTags, removeTag } from "../api/tags.api"
import { queryClient } from "../router"
import { Tag } from "../types"

export const ownTagsQuery = () => ({
  queryKey: ["tags", "user"],
  queryFn: fetchUserTags
})

export function useTags() {
  return useQuery<Tag[]>(ownTagsQuery())
}

export const useTagRemoveMutation = (id: number | string) =>
  useMutation(removeTag, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", { id: Number(id) }])
    },
  })
