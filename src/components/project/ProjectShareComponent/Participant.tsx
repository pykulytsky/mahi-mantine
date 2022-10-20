import { Avatar, Group, Text } from "@mantine/core"

type ParticipantProps = {
  name: string
  avatar?: string
  role?: string
}

export default function Participant(props: ParticipantProps) {
  return (
    <Group position="apart">
      <Group spacing="xs">
        <Avatar src={props.avatar} />
        <Text>{props.name}</Text>
      </Group>
      {props.role}
    </Group>
  )
}
