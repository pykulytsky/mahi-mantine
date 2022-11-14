import {
  ActionIcon,
  Group,
  Tooltip,
  Popover,
  useMantineTheme,
  Transition,
} from "@mantine/core"
import { Reaction, User } from "../../../types"
import { FaceAdd } from "../../icons"
import ReactionTag from "./Reaction"
// @ts-ignore
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import { useReactionAddMutation } from "../../../queries/tasks"
import { useQueryClient } from "@tanstack/react-query"

type ReactionListProps = {
  reactions: Reaction[]
  projectID: number
}

export default function ReactionList(props: ReactionListProps) {
  const queryClient = useQueryClient()
  const user: User | undefined = queryClient.getQueryData(["users", "me"])
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

  return (
    <Group spacing={3}>
      <Transition
        mounted={!!props.reactions}
        transition="pop"
        duration={400}
        timingFunction="ease-in"
      >
        {(style) => (
          <>
            {props.reactions.map((reaction) => (
              <ReactionTag
                style={style}
                projectID={props.projectID}
                key={reaction.id}
                {...reaction}
                userID={user?.id || -1}
              />
            ))}
          </>
        )}
      </Transition>

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
