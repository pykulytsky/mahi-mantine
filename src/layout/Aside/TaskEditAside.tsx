import { memo } from "react"
import TaskEditForm from "../../components/tasks/TaskEditForm/TaskEditForm"
import Aside from "./Aside"
import { MantineProvider } from "@mantine/core"
import TaskEditActions from "../../components/tasks/TaskEditForm/TaskEditActions"
import { useStore } from "../../store/taskContext"

export default memo(function DetailAside() {
  const [taskStore, setTaskStore] = useStore()
  return (
    <MantineProvider
      inherit
      theme={{
        primaryColor: taskStore?.color || "indigo",
      }}
    >
      <Aside
        opened={!!taskStore}
        toggle={() => {
          setTaskStore({
            id: undefined,
          })
        }}
        content={taskStore && <TaskEditForm {...taskStore} />}
        actions={
          taskStore && (
            <TaskEditActions
              toggle={() => {
                setTaskStore({
                  id: undefined,
                })
              }}
              taskID={taskStore.id}
              projectID={taskStore.projectID}
            />
          )
        }
      />
    </MantineProvider>
  )
})
