import {
  Container,
  SegmentedControl,
  Text,
  useMantineTheme,
} from "@mantine/core"
import { IconCalendar, IconLayoutKanban, IconLayoutList } from "@tabler/icons"

export default function DisplaySelect() {
  const theme = useMantineTheme()
  return (
    <SegmentedControl
      color={theme.primaryColor}
      sx={{ width: "100%" }}
      data={[
        {
          value: "list",
          label: (
            <Container>
              <IconLayoutList stroke={1.5} size={50} />
              <Text size="md">List</Text>
            </Container>
          ),
        },
        {
          value: "board",
          label: (
            <Container>
              <IconLayoutKanban stroke={1.5} size={50} />
              <Text size="md">Board</Text>
            </Container>
          ),
        },
        {
          value: "calendar",
          label: (
            <Container>
              <IconCalendar stroke={1.5} size={50} />
              <Text size="md">Calendar</Text>
            </Container>
          ),
        },
      ]}
    />
  )
}
