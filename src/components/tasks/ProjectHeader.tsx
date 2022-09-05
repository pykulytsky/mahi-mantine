import { Group, Text, Paper } from "@mantine/core";

interface ProjectHeaderProps {
  title: string;
}

export default function ProjectHeader(props: ProjectHeaderProps) {
  return (
    <Paper
      radius={0}
      mt={16}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        height: 50
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
          size="xl"
        >
          {props.title}
        </Text>
      </Group>
    </Paper>
  );
}
