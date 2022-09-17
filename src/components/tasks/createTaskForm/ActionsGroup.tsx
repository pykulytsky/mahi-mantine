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
    <Group spacing={0}>
      <Tooltip
        zIndex={9999}
        label={props.noteIsShown ? "Hide note" : "Add note"}
      >
        <ActionIcon
          color="indigo"
          onClick={props.toggleNote}
          size="lg"
          variant={props.noteIsShown ? "filled" : "subtle"}
        >
          <IconNotes size={20} />
        </ActionIcon>
      </Tooltip>
      <Tooltip zIndex={9999} label="Add reminder">
        <ActionIcon color="teal" size="lg" variant="subtle">
          <IconAlarm size={20} />
        </ActionIcon>
      </Tooltip>

      <Tooltip zIndex={9999} label="Set due date">
        <ActionIcon color="yellow" size="lg" variant="subtle">
          <IconCalendar size={20} />
        </ActionIcon>
      </Tooltip>
      <Tooltip zIndex={9999} label="Attach a file">
        <ActionIcon color="cyan" size="lg" variant="subtle">
          <IconPaperclip size={20} />
        </ActionIcon>
      </Tooltip>
    </Group>
  )
}
