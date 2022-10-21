import { forwardRef } from "react"
import {
  ActionIcon,
  Avatar,
  Box,
  Popover,
  Tooltip,
  useMantineTheme,
} from "@mantine/core"
import { useUser } from "../../queries/user"
import { Project } from "../../types"
import { Plus, User, Users } from "../icons"
import ProjectShareComponent from "./ProjectShareComponent/ProjectShareComponent"

type ParticipantsButtonProps = {
  project: Project
}

export const ParticipantsButton = forwardRef<
  HTMLElement,
  ParticipantsButtonProps
>(({ project }: ParticipantsButtonProps, ref) => {
  const theme = useMantineTheme()
  const { data } = useUser()
  if (project.participants.length > 0 && data)
    return (
      <Box>
        <Avatar.Group>
          <Popover width={350}>
            <Popover.Target>
              <Tooltip
                label={
                  data.id === project.owner.id ? "You" : project.owner.email
                }
              >
                <Avatar
                  sx={{
                    transition: "200ms transform ease-out",
                    "&:hover": {
                      transform: "translate(-10%, 0)",
                    },
                  }}
                  radius="xl"
                  size="md"
                  src={project.owner.avatar}
                />
              </Tooltip>
            </Popover.Target>
            <Popover.Dropdown>
              <ProjectShareComponent />
            </Popover.Dropdown>
          </Popover>
          {project.participants.map((user) => (
            <Tooltip
              key={user.id}
              label={data.id === user.id ? "You" : user.email}
            >
              <Avatar
                sx={{
                  transition: "200ms transform ease-out",
                  "&:hover": {
                    transform: "translate(-10%, 0)",
                  },
                }}
                color={project.accent_color || theme.primaryColor}
                radius="xl"
                size="md"
                src={user.avatar}
              >
                <User
                  size={25}
                  color={project.accent_color || theme.primaryColor}
                />
              </Avatar>
            </Tooltip>
          ))}
          {project.owner.id === data.id && (
            <Popover width={350}>
              <Popover.Target>
                <Tooltip label="Add user">
                  <Avatar
                    component="button"
                    sx={{
                      cursor: "pointer",
                    }}
                    color={project.accent_color || theme.primaryColor}
                    radius="xl"
                    size="md"
                  >
                    <Plus
                      size={25}
                      color={project.accent_color || theme.primaryColor}
                    />
                  </Avatar>
                </Tooltip>
              </Popover.Target>
              <Popover.Dropdown>
                <ProjectShareComponent />
              </Popover.Dropdown>
            </Popover>
          )}
        </Avatar.Group>
      </Box>
    )
  else
    return (
      <>
        {data && project.owner.id === data.id && (
          <ActionIcon variant="transparent">
            <Users size={25} />
          </ActionIcon>
        )}
      </>
    )
})

export default ParticipantsButton
