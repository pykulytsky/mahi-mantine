import { showNotification } from "@mantine/notifications"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  editProject,
  fetchProject,
  fetchUserProjects,
  createProject,
  sendDirectInvitation,
  removeUserFromProject,
} from "../api/projects.api"
import { reorder } from "../api/tasks.api"
import { queryClient } from "../router"
import { Project, TaskReorder } from "../types"

export const ownProjectsQuery = () => ({
  queryKey: ["projects", "user"],
  queryFn: fetchUserProjects,
})

export function useOwnProjects() {
  return useQuery<Project[]>(ownProjectsQuery())
}

export const projectQuery = (id: string | number) => ({
  queryKey: ["projects", { id: Number(id) }],
  queryFn: async () => fetchProject(id),
})

export function useProject(id: number | string) {
  return useQuery<Project>(projectQuery(id))
}

export const useReorderMutation = (id: string) =>
  useMutation(reorder, {
    onSuccess: () => {
      showNotification({
        title: "Project was successfully reordered.",
        message: undefined,
      })
    },
    onMutate: async (reorderData: TaskReorder) => {
      let oldProject = queryClient.getQueryData<Project>(["projects", { id }])

      let project = { ...oldProject }

      let source =
        reorderData.sourceType == "project"
          ? project
          : project.sections?.find(
              (section) => section.id === Number(reorderData.sourceID)
            )
      let destinition =
        reorderData.destinationType === "project"
          ? project
          : project.sections?.find(
              (section) => section.id === Number(reorderData.destinationID)
            )
      const task = source?.tasks?.splice(Number(reorderData.sourceOrder), 1)[0]
      if (task) {
        destinition?.tasks?.splice(
          Number(reorderData.destinationOrder),
          0,
          task
        )
      }
      return { project, oldProject }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        ["projects", { id: Number(id) }],
        context?.oldProject
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries(["projects", { id: Number(id) }])
    },
  })

export const useProjectMutation = (id: string) =>
  useMutation(editProject, {
    onSuccess: (data: Project) => {
      queryClient.setQueryData(["projects", { id: Number(id) }], data)
    },
  })

export const useProjectCreateMutation = () =>
  useMutation(createProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", "user"])
    },
  })

export const useAddUserMutation = (id: string | number) =>
  useMutation(sendDirectInvitation, {
    onSuccess: (data: Project) => {
      queryClient.setQueryData(["projects", { id: Number(id) }], data)
    },
  })

export const useUserRemoveMutation = (id: string | number) =>
  useMutation(removeUserFromProject, {
    onSuccess: (data: Project) => {
      queryClient.setQueryData(["projects", { id: Number(id) }], data)
    },
  })
