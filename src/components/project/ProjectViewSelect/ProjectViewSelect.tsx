import { Box, Center, SegmentedControl } from "@mantine/core"
import { useState } from "react"
import { Board, Calendar, List } from "../../icons"
import { useStyles } from "./ProjectViewSelect.styles"

export default function ProjectViewSelect() {
  const { classes } = useStyles()
  const [value, setValue] = useState("list")
  const views = [
    {
      value: "list",
      label: (
        <Center>
          <List size={20} color={value === "list" ? "white" : undefined} />
          <Box ml={10}>List</Box>
        </Center>
      ),
    },
    {
      value: "board",
      label: (
        <Center>
          <Board size={20} color={value === "board" ? "white" : undefined} />
          <Box ml={10}>Board</Box>
        </Center>
      ),
    },
    {
      value: "calendar",
      label: (
        <Center>
          <Calendar
            size={20}
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
      size="sm"
      data={views}
      classNames={classes}
    />
  )
}
