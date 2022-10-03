import { useMutation, useQuery } from "@tanstack/react-query"
import { applyTag } from "../api/tags.api"
import { addTask, editTask, getTask } from "../api/tasks.api"
import { queryClient } from "../router"
import { Task } from "../types"

export const taskQuery = (id: string | number) => ({
  queryKey: ["tasks", { id }],
  queryFn: async () => getTask(id),
})

export function useTaskQuery(id: string | number) {
  return useQuery<Task>(taskQuery(id))
}

export const useApplyTagMutation = () => useMutation(applyTag)

export const useTaskAddMutation = () => useMutation(addTask)

export const useTaskEditMutation = (id: number | string) =>
  useMutation(editTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", { id: Number(id) }])
    },
  })
