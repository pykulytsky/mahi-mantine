import { useContext } from "react"
import { SelectedTaskContext } from "../LayoutProvider"
import TaskEditForm from "../../components/tasks/TaskEditForm/TaskEditForm"
import Aside from "./Aside"
import { MantineProvider } from "@mantine/core"

export default function DetailAside() {
  const { selectedTask, setSelectedTask } = useContext(SelectedTaskContext)
  return (
    <MantineProvider
      inherit
      theme={{
        primaryColor: selectedTask?.color || "indigo",
      }}
    >
      <Aside
        opened={!!selectedTask}
        toggle={() => {
          setSelectedTask(null)
        }}
        content={selectedTask && <TaskEditForm {...selectedTask} />}
      />
    </MantineProvider>
  )
}
