import {
  Group,
  Text,
  Title,
  Paper,
  ActionIcon,
  useMantineTheme,
  Button,
  Popover,
  MediaQuery,
  Transition,
  TextInput,
  Progress,
  Tooltip,
  Stack,
} from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { IconCheck } from "@tabler/icons"
import ColorEmojiPicker from "../projectEditForms/ColorEmojiPicker"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"
import { Project, ProjectEdit } from "../../../types"
import ProjectActions from "../ProjectActions"
import { useState } from "react"
import { useStyles } from "./ProjectHeader.styles"
import { useProjectMutation } from "../../../queries/projects"
import { Todo, File as FileIcon } from "../../icons"

interface ProjectHeaderProps {
  project: Project
  tasksCount?: [number, number]
  formVisible: boolean
  toggleTaskForm: () => void
  toggleSectionForm: () => void
}

export default function ProjectHeader(props: ProjectHeaderProps) {
  const [isNameEditing, setNameEditing] = useState<boolean>(false)
  const [name, setName] = useState<string>(props.project.name)
  const { hovered, ref } = useHover()
  const [nameError, setNameError] = useState<string>("")
  const theme = useMantineTheme()
  const { classes, cx } = useStyles(hovered)
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
      setNameEditing(false)
      updateProject({ name })
    } else setNameError("Name is to short.")
  }

  return (
    <Paper radius="lg" ref={ref} className={classes.root}>
      <Group position="apart">
        <Group spacing="md">
          <Popover position="right-end">
            <Popover.Target>
              <ActionIcon
                loading={!!isFetching || !!isMutating}
                variant="light"
                size={55}
                radius="lg"
                color={theme.colors[theme.primaryColor][5]}
              >
                {props.project.icon ? (
                  <Title order={2}>{props.project.icon}</Title>
                ) : (
                  <FileIcon
                    size={30}
                    color={theme.colors[theme.primaryColor][2]}
                  />
                )}
              </ActionIcon>
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
              <Transition
                mounted={!isNameEditing}
                transition="pop"
                duration={400}
                timingFunction="ease"
              >
                {(styles) => (
                  <Text
                    onClick={() => {
                      setNameEditing(!isNameEditing)
                    }}
                    style={styles}
                    className={classes.title}
                    weight={700}
                    size={25}
                  >
                    {props.project.name}
                  </Text>
                )}
              </Transition>
              <Transition
                mounted={isNameEditing}
                transition="pop"
                duration={400}
                timingFunction="ease-out"
              >
                {(styles) => (
                  <TextInput
                    variant="filled"
                    style={styles}
                    value={name}
                    error={nameError}
                    onChange={(event: any) => {
                      setName(event.target.value)
                    }}
                  />
                )}
              </Transition>
              {isNameEditing && (
                <ActionIcon onClick={onNameSave} variant="filled">
                  <IconCheck size={16} />
                </ActionIcon>
              )}
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

        {!props.formVisible && (
          <Button
            className={cx(classes.shownOnHover, classes.addBtnGroup)}
            compact
            leftIcon={
              <Todo size={23} color={theme.colors[theme.primaryColor][3]} />
            }
            variant="subtle"
            onClick={props.toggleTaskForm}
          >
            Add task
          </Button>
        )}
        <ProjectActions
          updateProject={updateProject}
          hovered={hovered}
          project={props.project}
        />
      </Group>
    </Paper>
  )
}
