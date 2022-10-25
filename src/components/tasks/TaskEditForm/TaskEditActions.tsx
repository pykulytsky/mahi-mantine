import { useState } from "react"
import {
  Group,
  Popover,
  Tooltip,
  ActionIcon,
  Indicator,
  useMantineTheme,
  Text,
} from "@mantine/core"
import { Plus, Face, Trash, Comment } from "../../icons"

// @ts-ignore
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import {
  useTaskQuery,
  useReactionAddMutation,
  useTaskDeleteMutation,
} from "../../../queries/tasks"
import { openConfirmModal } from "@mantine/modals"

type TaskEditActions = {
  taskID: number | string
  projectID: number | string
  toggle: () => void
}

export default function TaskEditActions(props: TaskEditActions) {
  const [opened, setOpened] = useState(false)

  const theme = useMantineTheme()
  const { data: task } = useTaskQuery(props.taskID)
  const remove = useTaskDeleteMutation(props.projectID)
  const add = useReactionAddMutation(props.projectID)

  function onEmojiSelect(emojiData: any) {
    if (task) {
      if (
        !task.reactions
          .map((reaction) => reaction.emoji)
          .includes(emojiData.native)
      ) {
        add.mutate({
          emoji: emojiData.native,
          task_id: Number(props.taskID),
        })
      }
      setOpened(false)
    }
  }

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
        remove.mutate(
          { id: props.taskID },
          {
            onSuccess: () => {
              props.toggle()
            },
          }
        )
      },
    })
  }

  return (
    <Group>
      <Popover opened={opened} onChange={setOpened}>
        <Popover.Target>
          <Tooltip label="Add reaction">
            <ActionIcon
              onClick={() => setOpened((o) => !o)}
              variant="transparent"
            >
              <Indicator
                inline
                label={<Plus size={18} />}
                size={16}
                position="top-end"
                offset={2}
                color="transparent"
              >
                <Face size={20} />
              </Indicator>
            </ActionIcon>
          </Tooltip>
        </Popover.Target>
        <Popover.Dropdown sx={{ padding: 0 }}>
          <Picker
            perLine={8}
            previewPosition="none"
            theme={theme.colorScheme}
            data={data}
            onEmojiSelect={onEmojiSelect}
          />
        </Popover.Dropdown>
      </Popover>
      <Tooltip label="Comments">
        <ActionIcon variant="transparent">
          <Indicator inline label="16" size={16} position="top-end" offset={1}>
            <Comment size={25} />
          </Indicator>
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Delete task">
        <ActionIcon
          size="lg"
          variant="light"
          color="red"
          onClick={onTaskDelete}
        >
          <Trash size={20} color={theme.colors.red[4]} />
        </ActionIcon>
      </Tooltip>
    </Group>
  )
}
