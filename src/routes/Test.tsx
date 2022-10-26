import { useState } from "react"
import { TreeItems } from "../components/dnd/types"
import { useQuery } from "@tanstack/react-query"
import { fetchProject } from "../api/projects.api"
import { showNotification } from "@mantine/notifications"
import { Button, Checkbox } from "@mantine/core"
import { useSearch } from "@tanstack/react-location"
import { LocationGenerics } from "../router"
import { DnDTasksList } from "../components/dnd"
import { Project as ProjectType } from "../types"
import { useToggle } from "@mantine/hooks"

export default function Test() {
  const search = useSearch<LocationGenerics>()
  const [tasks, setTasks] = useState<TreeItems>([])
  const { data, isLoading, isError } = useQuery(
    ["projects", { id: 1 }],
    async () => fetchProject(1),
    {
      onSuccess: (data: ProjectType) => {
        toggle()
        const tasks: TreeItems = data.tasks.map((task) => ({
          id: `task_${task.id}`,
          isTask: true,
          task,
          name: task.name,
          children: task.tasks.map((subtask) => ({
            id: `task_${subtask.id}`,
            isTask: true,
            task: subtask,
            name: subtask.name,
            children: [],
          })),
        }))
        setTasks(() => [...tasks])
        toggle()
      },
    }
  )
  return (
    <>
      <h1>{JSON.stringify(search)}</h1>
      {tasks.length && <DnDTasksList collapsible defaultItems={tasks} />}
    </>
  )
}
