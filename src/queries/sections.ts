import { useMutation } from "@tanstack/react-query"
import { addSection } from "../api/sections.api"
import { queryClient } from "../router"

export const useSectionMutation = (id: number) =>
  useMutation(addSection, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", { id: id }])
    },
  })
