import { Group, ActionIcon, useMantineTheme, MediaQuery } from "@mantine/core"
import { DotsThreeCircle, Star } from "phosphor-react"
import { Project, ProjectEdit } from "../../types"

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
            size={20}
            weight={props.project.is_favorite ? "fill" : "duotone"}
            color={theme.colors[theme.primaryColor][3]}
          />
        </ActionIcon>
      </MediaQuery>
      <ActionIcon variant="transparent">
        <DotsThreeCircle
          size={25}
          weight="duotone"
          color={theme.colors[theme.primaryColor][3]}
        />
      </ActionIcon>
    </Group>
  )
}
