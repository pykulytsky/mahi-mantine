import { Group, Text, Paper } from "@mantine/core";

interface ProjectHeaderProps {
  name: string;
}

export default function ProjectHeader(props: ProjectHeaderProps) {
  return (
    <Paper
      radius={0}
      sx={{
        position: "sticky",
        top: 50,
        zIndex: 999,
      }}
    >
      <Group
        p="md"
      >
        <Text
          sx={{
            cursor: "pointer",
          }}
          weight={700}
          size="lg"
        >
          {props.name}
        </Text>
      </Group>
    </Paper>
  );
}
