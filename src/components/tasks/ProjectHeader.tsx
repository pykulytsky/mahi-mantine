import {
  Group,
  Text,
  Paper,
  ActionIcon,
  useMantineTheme,
  Button,
  createStyles,
} from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { Pencil, Plus, DotsThreeCircle } from "phosphor-react"

interface ProjectHeaderProps {
  title: string
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
    transition: "all .2s linear",
  },
  title: {
    cursor: "pointer",
  },
  addBtn: {
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
          <Text className={classes.title} weight={700} size="xl">
            {props.title}
          </Text>
          <ActionIcon className={classes.shownOnHover} variant="transparent">
            <Pencil weight="duotone" />
          </ActionIcon>
          <Text italic size="sm">
            16 of 22
          </Text>
        </Group>
        <Button
          className={cx(classes.addBtn, classes.shownOnHover)}
          leftIcon={<Plus size={15} />}
          variant="subtle"
        >
          Add task
        </Button>
        <Group className={classes.shownOnHover}>
          <ActionIcon variant="transparent">
            <DotsThreeCircle size={25} weight="duotone" />
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  )
}
