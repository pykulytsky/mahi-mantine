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
import { DotsSixVertical, CheckCircle } from "phosphor-react"

interface ProjectHeaderProps {
  name: string
  onOpen: () => void
  dragHandleProps: DraggableProvidedDragHandleProps | null
  tasksCount?: [number, number]
  formVisible: boolean
  toggleTaskForm: () => void
}

const useStyles = createStyles((theme, hovered: boolean) => ({
  shownOnHover: {
    opacity: hovered ? 1 : 0,
    transition: "opacity .2s linear",
  },
  addBtn: {
    position: "absolute",
    left: "45%",
  },
}))

export default function SectionHeader(props: ProjectHeaderProps) {
  const { hovered, ref } = useHover()
  const { classes, cx } = useStyles(hovered)

  return (
    <Paper
      ref={ref}
      radius={0}
      p="xs"
      pl="sm"
      pt={0}
      sx={{
        position: "sticky",
        top: 100,
        zIndex: 98,
        height: 45,
      }}
    >
      <Group p="xs">
        <ActionIcon className={classes.shownOnHover} {...props.dragHandleProps}>
          <DotsSixVertical />
        </ActionIcon>
        <Text
          sx={{
            cursor: "pointer",
          }}
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
              style={hovered ? style : null}
              className={cx(classes.addBtn, classes.shownOnHover)}
              compact
              leftIcon={<CheckCircle size={15} />}
              variant="default"
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
