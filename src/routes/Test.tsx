import Activity from "../components/icons/Activity"
import { showNotification } from "@mantine/notifications"
import { Button, Checkbox } from "@mantine/core"
import Task from "../components/tasks/Task/Task"

export default function Test() {
  return (
    <>
      <h1>test</h1>
      <Button
        onClick={() => {
          showNotification({
            title: "test",
            message: <Checkbox label="Test task with some info" />,
          })
        }}
      >
        test
      </Button>
    </>
  )
}
