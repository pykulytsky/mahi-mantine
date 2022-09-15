import {
  Group,
  Text,
  Title,
  Paper,
  ActionIcon,
  useMantineTheme,
  Button,
  createStyles,
} from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { Pencil, DotsThreeCircle, CheckCircle } from "phosphor-react"
import { IconSection } from "@tabler/icons"

interface ProjectHeaderProps {
  id?: number
  name: string
  icon?: string
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

  return (
    <Paper ref={ref} radius={0} mt={16} className={classes.root}>
      <Group p="md" position="apart">
        <Group spacing={5}>
          {props.icon && (
            <ActionIcon variant="transparent">
              <Title order={3}>{props.icon}</Title>
            </ActionIcon>
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
              variant="default"
              onClick={props.toggleTaskForm}
            >
              Add task
            </Button>
            <Button
              compact
              rightIcon={<IconSection size={15} />}
              variant="default"
            >
              Add section
            </Button>
          </Button.Group>
        )}
        <Group className={classes.shownOnHover}>
          <ActionIcon variant="transparent">
            <DotsThreeCircle size={25} weight="duotone" />
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  )
}
