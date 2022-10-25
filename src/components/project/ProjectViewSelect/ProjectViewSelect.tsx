import { Box, Center, SegmentedControl } from "@mantine/core"
import { useState } from "react"
import { Board, Calendar, List } from "../../icons"
import { useStyles } from "./ProjectViewSelect.styles"

type ProjectViewSelectProps = {}

export default function ProjectViewSelect(props: ProjectViewSelectProps) {
  const { classes } = useStyles()
  const [value, setValue] = useState("list")
  const views = [
    {
      value: "list",
      label: (
        <Center>
          <List size={25} color={value === "list" ? "white" : undefined} />
          <Box ml={10}>List</Box>
        </Center>
      ),
    },
    {
      value: "board",
      label: (
        <Center>
          <Board size={25} color={value === "board" ? "white" : undefined} />
          <Box ml={10}>Board</Box>
        </Center>
      ),
    },
    {
      value: "calendar",
      label: (
        <Center>
          <Calendar
            size={25}
            color={value === "calendar" ? "white" : undefined}
          />
          <Box ml={10}>Calendar</Box>
        </Center>
      ),
    },
  ]
  return (
    <SegmentedControl
      radius="xl"
      value={value}
      onChange={setValue}
      size="md"
      data={views}
      classNames={classes}
    />
  )
}
