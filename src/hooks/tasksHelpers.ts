import { useMemo } from "react"
import { Project, ProjectEdit, Section } from "../types"

export default function useTasksHelper(data: Project | Section | undefined) {
  return {
    isEmpty: useMemo((): boolean => {
      if (data) {
        return data.tasks.length == 0 && "sections" in data
          ? data.sections.length == 0
          : false
      }
      return false
    }, [data]),
    tasksCount: useMemo((): [number, number] | undefined => {
      if (data?.tasks.length) {
        return [
          data.tasks.filter((task) => task.is_done).length,
          data.tasks.length,
        ]
      }
    }, [data]),
    projectTasksCount: useMemo((): [number, number] | undefined => {
      let completedTasks =
        data?.tasks.filter((task) => task.is_done).length || 0
      let totalTasks = data?.tasks.length || 0

      if (data && "sections" in data) {
        data.sections.forEach((section) => {
          totalTasks += section.tasks.length
          completedTasks += section.tasks.filter((task) => task.is_done).length
        })
      }

      return [completedTasks, totalTasks]
    }, [data]),
    updateProject: (project: ProjectEdit) => {
      
    }
  }
}
