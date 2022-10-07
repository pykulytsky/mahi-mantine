import { useContext } from "react"
import { SelectedTaskContext } from "../LayoutProvider"
import TaskEditForm from "../../components/tasks/TaskEditForm/TaskEditForm"
import Aside from "./Aside"

export default function DetailAside() {
  const { selectedTask, setSelectedTask } = useContext(SelectedTaskContext)
  return (
    <Aside
      opened={!!selectedTask}
      toggle={() => {
        setSelectedTask(null)
      }}
      content={selectedTask && <TaskEditForm {...selectedTask} />}
    />
  )
}
