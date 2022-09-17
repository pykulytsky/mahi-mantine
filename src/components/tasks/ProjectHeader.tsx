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
} from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { Pencil, DotsThreeCircle, CheckCircle } from "phosphor-react"
import { IconSection } from "@tabler/icons"
import ColorEmojiPicker from "./projectEditForms/ColorEmojiPicker"
import {
  useIsFetching,
  useIsMutating,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { editProject } from "../../api/projects.api"
import { ProjectEdit } from "../../types"

interface ProjectHeaderProps {
  id?: number
  name: string
  icon?: string
  color?: string
  tasksCount?: [number, number]
  formVisible: boolean
  toggleTaskForm: () => void
}

const useStyles = createStyles((theme, hovered: boolean) => ({
  root: {
    position: "sticky",
    top: 50,
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
  const { hovered, ref } = useHover()
  const theme = useMantineTheme()
  const { classes, cx } = useStyles(hovered)
  const queryClient = useQueryClient()
  const isFetching = useIsFetching(["projects", { id: props.id?.toString() }])
  const isMutating = useIsMutating()

  const projectMutation = useMutation(editProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", { id: props.id?.toString() }])
    },
  })

  function updateProject(project: ProjectEdit) {
    project.id = props.id
    projectMutation.mutate(project)
  }

  return (
    <Paper ref={ref} radius={0} mt={16} className={classes.root}>
      <Group p="md" position="apart">
        <Group spacing={5}>
          {props.icon && (
            <Popover>
              <Popover.Target>
                <ActionIcon
                  loading={!!isFetching || !!isMutating}
                  variant="light"
                  size={35}
                  color={theme.colors[theme.primaryColor][5]}
                >
                  <Title order={4}>{props.icon}</Title>
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown p={0}>
                <ColorEmojiPicker
                  updateProject={updateProject}
                  color={props.color}
                />
              </Popover.Dropdown>
            </Popover>
          )}
          <Text className={classes.title} weight={700} size="xl">
            {props.name}
          </Text>
          <ActionIcon className={classes.shownOnHover} variant="transparent">
            <Pencil weight="duotone" />
          </ActionIcon>
          {props.tasksCount && (
            <Text italic size="sm">
              <span>{props.tasksCount[0]} </span> of{" "}
              <span>{props.tasksCount[1]}</span>
            </Text>
          )}
        </Group>

        {!props.formVisible && (
          <Button.Group
            className={cx(classes.shownOnHover, classes.addBtnGroup)}
          >
            <Button
              compact
              leftIcon={<CheckCircle size={15} />}
              variant="subtle"
              onClick={props.toggleTaskForm}
            >
              Add task
            </Button>
            <Button
              compact
              rightIcon={<IconSection size={15} />}
              variant="subtle"
            >
              Add section
            </Button>
          </Button.Group>
        )}
        <Group className={classes.shownOnHover}>
          <ActionIcon variant="transparent">
            <DotsThreeCircle
              size={25}
              weight="duotone"
              color={theme.colors[theme.primaryColor][5]}
            />
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  )
}
