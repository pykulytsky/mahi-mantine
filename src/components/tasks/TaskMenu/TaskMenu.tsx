import { Menu, ActionIcon, useMantineTheme, Text } from "@mantine/core"
import { openConfirmModal } from "@mantine/modals"
import { useTaskDeleteMutation } from "../../../queries/tasks"
import { Menu as MenuIcon, Pen } from "../../icons"
import SimpleArrowDown from "../../icons/SimpleArrowDown"
import SimpleArrowTop from "../../icons/SimpleArrowTop"
import Subtask from "../../icons/Subtask"
import Trash from "../../icons/Trash"
import { useStoreSetter } from "../../../store/taskContext"

type TaskMenuProps = {
  taskID: number
  projectID: number | string
}

export default function TaskMenu(props: TaskMenuProps) {
  const theme = useMantineTheme()
  const setTaskStore = useStoreSetter()
  const { mutate } = useTaskDeleteMutation(props.projectID)

  function onTaskDelete() {
    openConfirmModal({
      title: "Are you shure you want to delete this task?",
      centered: true,
      children: (
        <Text>
          If you delete task, it will be
          <span style={{ color: "red" }}> impossible to restore </span> it.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => {
        mutate({ id: props.taskID })
      },
    })
  }
  return (
    <Menu width={200}>
      <Menu.Target>
        <ActionIcon
          className="hover-control"
          sx={{
            visibility: "hidden",
            transition: "200ms visibility ease-in",
          }}
        >
          <MenuIcon size={20} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => {
            setTaskStore({
              id: props.taskID,
              projectID: props.projectID,
            })
          }}
          icon={<Pen size={15} />}
        >
          Edit
        </Menu.Item>
        <Menu.Item icon={<SimpleArrowTop size={15} />}>
          Add task above
        </Menu.Item>
        <Menu.Item icon={<SimpleArrowDown size={15} />}>
          Add task below
        </Menu.Item>
        <Menu.Item icon={<Subtask size={15} />}>Add subtask</Menu.Item>
        <Menu.Item
          onClick={onTaskDelete}
          color="red"
          icon={<Trash color={theme.colors.red[6]} size={15} />}
        >
          Delete task
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
