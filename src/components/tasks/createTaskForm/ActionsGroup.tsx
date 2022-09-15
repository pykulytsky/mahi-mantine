import { Group, ActionIcon, Tooltip } from "@mantine/core"
import {
  IconNotes,
  IconAlarm,
  IconCalendar,
  IconPaperclip,
} from "@tabler/icons"

type ActionsGroupProps = {
  toggleNote: () => void
  noteIsShown: boolean
}

export default function ActionsGroup(props: ActionsGroupProps) {
  return (
    <Group spacing="sm">
      <Tooltip
        zIndex={9999}
        label={props.noteIsShown ? "Hide note" : "Add note"}
      >
        <ActionIcon
          color="indigo"
          onClick={props.toggleNote}
          size="lg"
          variant={props.noteIsShown ? "filled" : "default"}
        >
          <IconNotes size={20} />
        </ActionIcon>
      </Tooltip>
      <Tooltip zIndex={9999} label="Add reminder">
        <ActionIcon size="lg" variant="default">
          <IconAlarm size={20} />
        </ActionIcon>
      </Tooltip>

      <Tooltip zIndex={9999} label="Set due date">
        <ActionIcon size="lg" variant="default">
          <IconCalendar size={20} />
        </ActionIcon>
      </Tooltip>
      <Tooltip zIndex={9999} label="Attach a file">
        <ActionIcon size="lg" variant="default">
          <IconPaperclip size={20} />
        </ActionIcon>
      </Tooltip>
    </Group>
  )
}
