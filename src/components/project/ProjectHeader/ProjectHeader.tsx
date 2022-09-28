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
} from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { CheckCircle } from "phosphor-react"
import { IconSection, IconCheck } from "@tabler/icons"
import ColorEmojiPicker from "../projectEditForms/ColorEmojiPicker"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"
import { Project, ProjectEdit } from "../../../types"
import ProjectActions from "../ProjectActions"
import { useState } from "react"
import { useStyles } from "./ProjectHeader.styles"
import { useProjectMutation } from "../../../queries/projects"
import { Pen, Todo } from "../../icons"

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
    <Paper m={0} pl={70} pr="lg" ref={ref} radius={0} className={classes.root}>
      <Group p={5} mt={25} position="apart">
        <Group spacing={5}>
          {props.project.icon && (
            <Popover position="right-end">
              <Popover.Target>
                <ActionIcon
                  loading={!!isFetching || !!isMutating}
                  variant="light"
                  size={55}
                  radius="lg"
                  color={theme.colors[theme.primaryColor][5]}
                >
                  <Title order={3}>{props.project.icon}</Title>
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown p={0}>
                <ColorEmojiPicker
                  updateProject={updateProject}
                  color={props.project.accent_color}
                />
              </Popover.Dropdown>
            </Popover>
          )}
          <Transition
            mounted={!isNameEditing}
            transition="slide-right"
            duration={400}
            timingFunction="ease"
          >
            {(styles) => (
              <Text
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
            transition="slide-right"
            duration={400}
            timingFunction="ease"
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
          {isNameEditing ? (
            <ActionIcon onClick={onNameSave} variant="filled">
              <IconCheck size={16} />
            </ActionIcon>
          ) : (
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
              <ActionIcon
                onClick={() => {
                  setNameEditing(!isNameEditing)
                }}
                className={classes.shownOnHover}
                variant="transparent"
              >
                <Pen size={20} />
              </ActionIcon>
            </MediaQuery>
          )}
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            {props.tasksCount && (
              <Tooltip
                label={`${props.tasksCount[0]} of ${props.tasksCount[1]}`}
              >
                <Progress
                  className={classes.progress}
                  value={(props.tasksCount[0] * 100) / props.tasksCount[1]}
                />
              </Tooltip>
            )}
          </MediaQuery>
        </Group>

        {!props.formVisible && (
          <Button.Group
            className={cx(classes.shownOnHover, classes.addBtnGroup)}
          >
            <Button
              compact
              leftIcon={
                <Todo size={23} color={theme.colors[theme.primaryColor][3]} />
              }
              variant="subtle"
              onClick={props.toggleTaskForm}
            >
              Add task
            </Button>
            <Button
              onClick={props.toggleSectionForm}
              compact
              rightIcon={<IconSection size={20} />}
              variant="subtle"
            >
              Add section
            </Button>
          </Button.Group>
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
