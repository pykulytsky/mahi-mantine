import { Group, ActionIcon, Tooltip, useMantineTheme } from "@mantine/core"
import { Calendar, File, Alarm } from "../../icons"
import Attach from "../../icons/Attach"

type ActionsGroupProps = {
  toggleNote: () => void
  noteIsShown: boolean
}

export default function ActionsGroup(props: ActionsGroupProps) {
  const theme = useMantineTheme()
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
          <File size={20} color={theme.colors.indigo[3]} />
        </ActionIcon>
      </Tooltip>
      <Tooltip zIndex={9999} label="Add reminder">
        <ActionIcon color="teal" size="lg" variant="subtle">
          <Alarm size={20} color={theme.colors.teal[3]} />
        </ActionIcon>
      </Tooltip>

      <Tooltip zIndex={9999} label="Set due date">
        <ActionIcon color="yellow" size="lg" variant="subtle">
          <Calendar size={20} color={theme.colors.yellow[3]} />
        </ActionIcon>
      </Tooltip>
      <Tooltip zIndex={9999} label="Attach a file">
        <ActionIcon color="cyan" size="lg" variant="subtle">
          <Attach size={20} color={theme.colors.cyan[3]} />
        </ActionIcon>
      </Tooltip>
    </Group>
  )
}
