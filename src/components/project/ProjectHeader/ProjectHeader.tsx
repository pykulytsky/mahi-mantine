import {
  Group,
  Paper,
  Popover,
  MediaQuery,
  TextInput,
  Progress,
  Tooltip,
  Stack,
} from "@mantine/core"
import { useFocusWithin, usePrevious } from "@mantine/hooks"
import ColorEmojiPicker from "../projectEditForms/ColorEmojiPicker"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"
import { Project, ProjectEdit } from "../../../types"
import ProjectActions from "../ProjectActions"
import { useEffect, useState, memo } from "react"
import { useStyles } from "./ProjectHeader.styles"
import { useProjectMutation } from "../../../queries/projects"
import { ProjectButton } from "../ProjectButton"
import ProjectViewSelect from "../ProjectViewSelect/ProjectViewSelect"

interface ProjectHeaderProps {
  project: Project
  tasksCount?: [number, number]
  formVisible: boolean
  toggleTaskForm: () => void
}

export default memo(function ProjectHeader(props: ProjectHeaderProps) {
  const [name, setName] = useState<string>(props.project.name)
  const { focused, ref: refFocus } = useFocusWithin()
  const previousFocusedState = usePrevious(focused)
  const [nameError, setNameError] = useState<string>("")
  const { classes, theme } = useStyles()
  const isFetching = useIsFetching([
    "projects",
    { id: props.project.id.toString() },
  ])
  const isMutating = useIsMutating()

  const projectMutation = useProjectMutation(props.project.id.toString())

  function updateProject(project: ProjectEdit): void {
    project.id = props.project.id
    projectMutation.mutate(project)
  }

  function onNameSave(): void {
    if (name.length > 0) {
      if (name !== props.project.name) updateProject({ name })
    } else setNameError("Name is to short.")
  }
  useEffect(() => {
    if (previousFocusedState !== undefined && previousFocusedState) {
      onNameSave()
    }
  }, [focused])

  useEffect(() => {
    setName(props.project.name)
  }, [props.project.name])

  return (
    <Paper radius="lg" className={classes.root}>
      <Group noWrap position="apart">
        <Group spacing="md" noWrap>
          <Popover position="right-end">
            <Popover.Target>
              <ProjectButton
                loading={!!isFetching || !!isMutating}
                icon={props.project.icon}
              />
            </Popover.Target>
            <Popover.Dropdown p={0}>
              <ColorEmojiPicker
                updateProject={updateProject}
                color={props.project.accent_color}
              />
            </Popover.Dropdown>
          </Popover>
          <Stack justify="flex-start" spacing={0}>
            <Group m={0} p={0} spacing={4}>
              <TextInput
                ref={refFocus}
                className={classes.titleForm}
                variant={focused ? "default" : "unstyled"}
                value={name}
                error={nameError}
                onChange={(event: any) => {
                  setName(event.target.value)
                }}
              />
            </Group>
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
              {props.tasksCount && (
                <Tooltip
                  label={`${props.tasksCount[0]} of ${props.tasksCount[1]}`}
                >
                  <Progress
                    color={theme.colors[theme.primaryColor][5]}
                    className={classes.progress}
                    value={(props.tasksCount[0] * 100) / props.tasksCount[1]}
                  />
                </Tooltip>
              )}
            </MediaQuery>
          </Stack>
        </Group>
        <ProjectViewSelect />
        <ProjectActions updateProject={updateProject} project={props.project} />
      </Group>
    </Paper>
  )
})
