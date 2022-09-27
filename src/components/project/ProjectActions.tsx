import { Group, ActionIcon, useMantineTheme, MediaQuery } from "@mantine/core"
import { Project, ProjectEdit } from "../../types"
import { Star } from "../icons"
import ProjectMenu from "./ProjectMenu"

type ProjectActionsProps = {
  hovered: boolean
  project: Project
  updateProject: (project: ProjectEdit) => void
}

export default function ProjectActions(props: ProjectActionsProps) {
  const theme = useMantineTheme()
  return (
    <Group
      spacing="xs"
      sx={{
        opacity: props.hovered ? 1 : 0,
        transition: "opacity .2s linear",
      }}
    >
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <ActionIcon
          onClick={() => {
            props.updateProject({ is_favorite: !props.project.is_favorite })
          }}
          variant="transparent"
        >
          <Star
            size={25}
            filled={props.project.is_favorite}
            color={theme.colors[theme.primaryColor][3]}
          />
        </ActionIcon>
      </MediaQuery>
      <ProjectMenu />
    </Group>
  )
}
