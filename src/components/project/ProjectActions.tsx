import { Group, ActionIcon, useMantineTheme, MediaQuery } from "@mantine/core"
import { Project, ProjectEdit } from "../../types"
import { Settings, Star } from "../icons"
import ProjectMenu from "./ProjectMenu"

type ProjectActionsProps = {
  hovered: boolean
  project: Project
  updateProject: (project: ProjectEdit) => void
}

export default function ProjectActions(props: ProjectActionsProps) {
  const theme = useMantineTheme()
  return (
    <Group spacing="xs">
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <ActionIcon
          onClick={() => {
            props.updateProject({ is_favorite: !props.project.is_favorite })
          }}
          variant="transparent"
        >
          <Star size={25} filled={props.project.is_favorite} />
        </ActionIcon>
      </MediaQuery>
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <ActionIcon variant="transparent">
          <Settings size={25} />
        </ActionIcon>
      </MediaQuery>
      <ProjectMenu />
    </Group>
  )
}
