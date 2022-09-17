import {
  Checkbox,
  createStyles,
  Container,
  Text,
  Group,
  ActionIcon,
} from "@mantine/core"
import { DotsSixVertical } from "phosphor-react"
import { useHover } from "@mantine/hooks"
import { TaskProps } from "./sharedTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editTask } from "../../api/tasks.api"
import { useMatch } from "react-location"
import { showNotification } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons"

const useStyles = createStyles((theme, isDraggable: boolean) => ({
  root: {
    borderRadius: theme.radius.md,
    cursor: "pointer",
    transition: "0.2s all ease-in-out",
    "&:hover": {
      background:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      boxShadow: theme.shadows.sm,
    },
  },
  task: {
    width: isDraggable ? "93%" : "100%",
    label: {
      cursor: "pointer",
    },
    inner: {
      cursor: "pointer",
    },
    input: {
      cursor: "pointer",
      border: `2px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[5]
      }`,
    },
  },
  draggingRoot: {
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    boxShadow: theme.shadows.md,
  },
  dragControl: {
    width: 10,
    transition: "0.2s all ease-in-out",
  },
  dragControlUnvisible: {
    opacity: 0,
  },
}))

export default function Task(props: TaskProps) {
  const { classes, cx } = useStyles(!!props.draggableHandleProps)
  const { hovered, ref } = useHover()
  const queryClient = useQueryClient()
  const {
    params: { projectID: id },
  } = useMatch()

  const taskMutation = useMutation(editTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", { id }])
    },
  })

  function handleTaskStatus() {
    taskMutation.mutate(
      {
        id: props.id,
        is_done: !props.is_done,
      },
      {
        onSuccess: () => {
          if (!props.is_done) {
            showNotification({
              title: `Task #${props.id} was completed`,
              message: null,
              icon: <IconCheck size={18} />,
            })
          }
        },
      }
    )
  }

  return (
    <Container
      ref={ref}
      p="sm"
      pl={!!props.draggableHandleProps ? 0 : "xs"}
      className={cx(classes.root, {
        [classes.draggingRoot]: props.isDragging,
      })}
      fluid
    >
      <Group spacing={0}>
        {props.draggableHandleProps && (
          <ActionIcon
            variant="transparent"
            {...props.draggableHandleProps}
            className={cx(classes.dragControl, {
              [classes.dragControlUnvisible]: !hovered && !props.isDragging,
            })}
          >
            <DotsSixVertical size={18} />
          </ActionIcon>
        )}
        <Checkbox
          sx={(theme) =>
            props.color
              ? {
                  input: {
                    border: `2px solid ${theme.colors[props.color][4]}`,
                  },
                }
              : {}
          }
          className={classes.task}
          color={props.color}
          checked={props.is_done}
          onChange={handleTaskStatus}
          size="md"
          label={
            <Text
              color={props.is_done ? "dimmed" : ""}
              onClick={(e: any): void => {
                e.preventDefault()
              }}
            >
              {props.name}
            </Text>
          }
        />
      </Group>
    </Container>
  )
}
