import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd"
import {
  Group,
  Text,
  Paper,
  ActionIcon,
  createStyles,
  Button,
  Transition,
} from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { useStyles } from "./SectionHeader.styles"
import { Drag, Task } from "../../icons"

interface ProjectHeaderProps {
  name: string
  onOpen: () => void
  dragHandleProps: DraggableProvidedDragHandleProps | null
  tasksCount?: [number, number]
  formVisible: boolean
  toggleTaskForm: () => void
}
export default function SectionHeader(props: ProjectHeaderProps) {
  const { hovered, ref } = useHover()
  const { classes, cx, theme } = useStyles(hovered)

  return (
    <Paper className={classes.root} ref={ref} p={0} pt={4} m={0}>
      <Group spacing={5} p={0} m={0}>
        <ActionIcon
          variant="transparent"
          className={classes.shownOnHover}
          {...props.dragHandleProps}
        >
          <Drag size={20} />
        </ActionIcon>
        <Text
          className={classes.pointerText}
          onClick={props.onOpen}
          weight={700}
          size="lg"
        >
          {props.name}
        </Text>
        {props.tasksCount && (
          <Text italic size="sm">
            <span>{props.tasksCount[0]}</span> of{" "}
            <span>{props.tasksCount[1]}</span>
          </Text>
        )}
        <Transition
          mounted={!props.formVisible}
          transition="pop"
          duration={400}
          timingFunction="ease-out"
        >
          {(style) => (
            <Button
              style={hovered ? style : undefined}
              className={cx(classes.addBtn, classes.shownOnHover)}
              compact
              leftIcon={
                <Task size={20} color={theme.colors[theme.primaryColor][3]} />
              }
              variant="subtle"
              onClick={props.toggleTaskForm}
            >
              Add task
            </Button>
          )}
        </Transition>
      </Group>
    </Paper>
  )
}
