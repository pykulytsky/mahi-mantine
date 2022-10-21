import { Group, ActionIcon, MediaQuery, Tooltip } from "@mantine/core"
import { Project, ProjectEdit } from "../../types"
import { Settings, Star } from "../icons"
import ParticipantsButton from "./Participants"
import ProjectMenu from "./ProjectMenu"

type ProjectActionsProps = {
  hovered: boolean
  project: Project
  updateProject: (project: ProjectEdit) => void
}

export default function ProjectActions(props: ProjectActionsProps) {
  return (
    <Group spacing="xs">
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <ParticipantsButton project={props.project} />
      </MediaQuery>
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Tooltip
          label={
            props.project.is_favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <ActionIcon
            onClick={() => {
              props.updateProject({ is_favorite: !props.project.is_favorite })
            }}
            variant="transparent"
          >
            <Star size={25} filled={+props.project.is_favorite} />
          </ActionIcon>
        </Tooltip>
      </MediaQuery>
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Tooltip label="Project settings">
          <ActionIcon variant="transparent">
            <Settings size={25} />
          </ActionIcon>
        </Tooltip>
      </MediaQuery>
      <ProjectMenu />
    </Group>
  )
}
