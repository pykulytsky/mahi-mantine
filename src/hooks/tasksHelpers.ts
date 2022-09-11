import { useMemo } from "react"
import { Project, Section } from "../types"

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
  }
}
