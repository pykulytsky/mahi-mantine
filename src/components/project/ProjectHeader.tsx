import {
  Group,
  Text,
  Title,
  Paper,
  ActionIcon,
  useMantineTheme,
  Button,
  createStyles,
  Popover,
  MediaQuery,
  Transition,
  TextInput,
} from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { Pencil, CheckCircle } from "phosphor-react"
import { IconSection, IconCheck } from "@tabler/icons"
import ColorEmojiPicker from "../project/projectEditForms/ColorEmojiPicker"
import {
  useIsFetching,
  useIsMutating,
  useQueryClient,
} from "@tanstack/react-query"
import { Project, ProjectEdit } from "../../types"
import ProjectActions from "./ProjectActions"
import { useState } from "react"
import { useProjectMutation } from "../../queries/projects"

interface ProjectHeaderProps {
  project: Project
  tasksCount?: [number, number]
  formVisible: boolean
  toggleTaskForm: () => void
  toggleSectionForm: () => void
}

const useStyles = createStyles((theme, hovered: boolean) => ({
  root: {
    position: "sticky",
    top: 0,
    zIndex: 99,
    height: 50,
    backdropFilter: "blur(5px)",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.dark[7], 0.5)
        : "white",
  },
  shownOnHover: {
    opacity: hovered ? 1 : 0,
    transition: "opacity .2s linear",
  },
  title: {
    cursor: "pointer",
  },
  addBtnGroup: {
    position: "absolute",
    left: "40%",
  },
}))

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
    <Paper pl="lg" pr="lg" ref={ref} radius={0} className={classes.root}>
      <Group p="md" position="apart">
        <Group spacing={5}>
          {props.project.icon && (
            <Popover position="right-end">
              <Popover.Target>
                <ActionIcon
                  loading={!!isFetching || !!isMutating}
                  variant="light"
                  size={35}
                  color={theme.colors[theme.primaryColor][5]}
                >
                  <Title order={4}>{props.project.icon}</Title>
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
                size="xl"
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
                <Pencil weight="duotone" />
              </ActionIcon>
            </MediaQuery>
          )}
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            {props.tasksCount && (
              <Text italic size="sm">
                <span>{props.tasksCount[0]} </span> of{" "}
                <span>{props.tasksCount[1]}</span>
              </Text>
            )}
          </MediaQuery>
        </Group>

        {!props.formVisible && (
          <Button.Group
            className={cx(classes.shownOnHover, classes.addBtnGroup)}
          >
            <Button
              compact
              leftIcon={<CheckCircle size={20} />}
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
