import {
  ActionIcon,
  Group,
  Loader,
  Tooltip,
  Popover,
  useMantineTheme,
} from "@mantine/core"
import { useUser } from "../../../queries/user"
import { Reaction } from "../../../types"
import { FaceAdd, Plus } from "../../icons"
import ReactionTag from "./Reaction"
// @ts-ignore
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import { useReactionAddMutation } from "../../../queries/tasks"

type ReactionListProps = {
  reactions: Reaction[]
  projectID: number
}

export default function ReactionList(props: ReactionListProps) {
  const { data: user, isLoading, isError } = useUser()
  const theme = useMantineTheme()
  const add = useReactionAddMutation(props.projectID)

  function onEmojiSelect(emojiData: any) {
    if (
      !props.reactions
        .map((reaction) => reaction.emoji)
        .includes(emojiData.native)
    ) {
      add.mutate({
        emoji: emojiData.native,
        task_id: props.reactions[0].task_id,
      })
    }
  }

  if (isLoading) return <Loader size="xs" />
  if (isError) return <p>Error</p>
  return (
    <Group spacing={3}>
      {props.reactions.map((reaction) => (
        <ReactionTag
          projectID={props.projectID}
          key={reaction.id}
          {...reaction}
          userID={user.id}
        />
      ))}
      <Popover>
        <Popover.Target>
          <Tooltip label="Add reaction">
            <ActionIcon variant="light" color={theme.primaryColor} size="sm">
              <FaceAdd size={15} />
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
    </Group>
  )
}
