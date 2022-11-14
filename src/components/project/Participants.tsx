import { forwardRef } from "react"
import {
  ActionIcon,
  Avatar,
  Box,
  Indicator,
  Popover,
  Tooltip,
  useMantineTheme,
} from "@mantine/core"
import { useUser } from "../../queries/user"
import { Project } from "../../types"
import { Plus, User, Users } from "../icons"
import ProjectShareComponent from "./ProjectShareComponent/ProjectShareComponent"
import { useStore } from "../../store/project"

type ParticipantsButtonProps = {
  project: Project
}

export const ParticipantsButton = forwardRef<
  HTMLElement,
  ParticipantsButtonProps
>(({ project }: ParticipantsButtonProps, ref) => {
  const theme = useMantineTheme()
  const { data } = useUser()
  const [members, _] = useStore()
  if (project.participants.length > 0 && data)
    return (
      <Box>
        <Avatar.Group>
          <Popover width={350}>
            <Popover.Target>
              {project.participants.length > 0 ? (
                <Tooltip
                  label={
                    data.id === project.owner.id ? "You" : project.owner.email
                  }
                >
                  <Indicator
                    inline
                    offset={3}
                    processing
                    position="bottom-start"
                    disabled={!members?.members.includes(project.owner.id)}
                    sx={{
                      transition: "200ms transform ease-out",
                      "&:hover": {
                        transform: "translate(-10%, 0)",
                      },
                    }}
                  >
                    <Avatar radius="xl" size="md" src={project.owner.avatar} />
                  </Indicator>
                </Tooltip>
              ) : (
                <ActionIcon variant="transparent">
                  <Users size={25} />
                </ActionIcon>
              )}
            </Popover.Target>
            <Popover.Dropdown>
              <ProjectShareComponent
                owner={project.owner}
                participants={project.participants}
              />
            </Popover.Dropdown>
          </Popover>
          {project.participants.map((user) => (
            <Tooltip
              key={user.id}
              label={data.id === user.id ? "You" : user.email}
            >
              <Indicator
                processing
                inline
                offset={3}
                position="bottom-start"
                disabled={!members?.members.includes(user.id)}
                sx={{
                  transition: "200ms transform ease-out",
                  "&:hover": {
                    transform: "translate(-10%, 0)",
                  },
                }}
              >
                <Avatar
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
              </Indicator>
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
                <ProjectShareComponent
                  participants={project.participants}
                  owner={project.owner}
                />
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
          <Popover width={350}>
            <Popover.Target>
              <Tooltip label="Share project">
                <ActionIcon variant="transparent">
                  <Users size={25} />
                </ActionIcon>
              </Tooltip>
            </Popover.Target>
            <Popover.Dropdown>
              <ProjectShareComponent
                participants={project.participants}
                owner={project.owner}
              />
            </Popover.Dropdown>
          </Popover>
        )}
      </>
    )
})

export default ParticipantsButton
