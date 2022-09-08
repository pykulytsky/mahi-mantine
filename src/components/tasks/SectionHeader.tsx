import { Group, Text, Paper } from "@mantine/core"

interface ProjectHeaderProps {
  name: string
}

export default function SectionHeader(props: ProjectHeaderProps) {
  return (
    <Paper
      radius={0}
      p="xs"
      pl="sm"
      pt={0}
      sx={{
        position: "sticky",
        top: 100,
        zIndex: 98,
        height: 45,
      }}
    >
      <Group p="xs">
        <Text
          sx={{
            cursor: "pointer",
          }}
          weight={700}
          size="lg"
        >
          {props.name}
        </Text>
        <Text italic size="sm">
          16 of 22
        </Text>
      </Group>
    </Paper>
  )
}
