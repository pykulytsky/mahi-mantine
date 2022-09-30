import { useMutation } from "@tanstack/react-query"
import { applyTag } from "../api/tags.api"
import { addTask, editTask } from "../api/tasks.api"
import { queryClient } from "../router"

export const useApplyTagMutation = () => useMutation(applyTag)

export const useTaskAddMutation = () => useMutation(addTask)

export const useTaskEditMutation = (id: number | string) =>
  useMutation(editTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", { id }])
    },
  })
