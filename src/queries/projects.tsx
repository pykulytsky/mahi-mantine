import { showNotification } from "@mantine/notifications"
import { IconArrowsSort } from "@tabler/icons"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  editProject,
  fetchProject,
  fetchUserProjects,
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
  queryKey: ["projects", { id }],
  queryFn: async () => fetchProject(id),
})

export function useProject(id: number | string) {
  return useQuery<Project>(projectQuery(id))
}

export const useReorderMutation = (id: string) =>
  useMutation(reorder, {
    onSuccess: (data) => {
      showNotification({
        title: "Project was successfully reordered.",
        message: undefined,
        icon: <IconArrowsSort size={18} />,
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
              (section) => section.id === Number(reorderData.destinitionID)
            )
      const task = source?.tasks?.splice(Number(reorderData.sourceOrder), 1)[0]
      destinition?.tasks?.splice(Number(reorderData.destinationOrder), 0, task)

      return { project, oldProject }
    },
    onError: (error, newProject, context) => {
      queryClient.setQueryData(["projects", { id }], context?.oldProject)
    },
    onSettled: (data) => {
      // queryClient.invalidateQueries(["projects", { id }])
    },
  })

export const useProjectMutation = (id: string) =>
  useMutation(editProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", { id }])
    },
  })
