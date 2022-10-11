import { ActionIcon, Avatar, Tooltip, useMantineTheme } from "@mantine/core"
import { useUser } from "../../queries/user"
import { Project } from "../../types"
import { User, Users } from "../icons"

type ParticipantsButtonProps = {
  project: Project
}

export default function ParticipantsButton(props: ParticipantsButtonProps) {
  const theme = useMantineTheme()
  const { data } = useUser()
  if (props.project.participants.length > 0 && data)
    return (
      <Avatar.Group>
        <Tooltip label={data.email}>
          <Avatar radius="xl" size="md" src={data.avatar} />
        </Tooltip>
        {props.project.participants.map((user) => (
          <Tooltip key={user.id} label={user.email}>
            <Avatar
              color={props.project.accent_color || theme.primaryColor}
              radius="xl"
              size="md"
              src={user.avatar}
            >
              <User
                size={25}
                color={props.project.accent_color || theme.primaryColor}
              />
            </Avatar>
          </Tooltip>
        ))}
      </Avatar.Group>
    )
  else
    return (
      <Tooltip label="Share project">
        <ActionIcon variant="transparent">
          <Users size={25} />
        </ActionIcon>
      </Tooltip>
    )
}
