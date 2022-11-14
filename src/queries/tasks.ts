import { useMutation, useQuery } from "@tanstack/react-query"
import { applyTag } from "../api/tags.api"
import {
  addTask,
  editTask,
  getTask,
  deleteTask,
  addReaction,
  removeReaction,
  assignTask,
  removeAssign,
} from "../api/tasks.api"
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
    onSuccess: (data: Task) => {
      queryClient.invalidateQueries(["projects", { id: Number(id) }])
    },
  })

export const useTaskDeleteMutation = (id: number | string) =>
  useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", { id: Number(id) }])
    },
  })

export const useReactionAddMutation = (id: number | string) =>
  useMutation(addReaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", { id: Number(id) }])
    },
  })

export const useReactionRemoveMutation = (id: number | string) =>
  useMutation(removeReaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", { id: Number(id) }])
    },
  })

export const useTaskAssignMutation = (
  projectId: number | string,
  id: number | string
) =>
  useMutation(assignTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", { id: Number(projectId) }])
      queryClient.invalidateQueries(["tasks", { id: Number(id) }])
    },
  })

export const useTaskAssignRemoveMutation = (
  projectId: number | string,
  id: number | string
) =>
  useMutation(removeAssign, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", { id: Number(projectId) }])
      queryClient.invalidateQueries(["tasks", { id: Number(id) }])
    },
  })
