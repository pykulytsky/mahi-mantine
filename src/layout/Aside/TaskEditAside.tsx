import { useContext } from "react"
import { SelectedTaskContext } from "../LayoutProvider"
import TaskEditForm from "../../components/tasks/TaskEditForm/TaskEditForm"
import Aside from "./Aside"
import { MantineProvider } from "@mantine/core"
import TaskEditActions from "../../components/tasks/TaskEditForm/TaskEditActions"

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
        actions={
          selectedTask && (
            <TaskEditActions
              toggle={() => {
                setSelectedTask(null)
              }}
              taskID={selectedTask.id}
              projectID={selectedTask.projectID}
            />
          )
        }
      />
    </MantineProvider>
  )
}
