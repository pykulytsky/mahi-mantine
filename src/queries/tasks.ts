import { useMutation } from "@tanstack/react-query"
import { applyTag } from "../api/tags.api"
import { addTask } from "../api/tasks.api"

export const useApplyTagMutation = () => useMutation(applyTag)

export const useTaskAddMutation = () => useMutation(addTask)
