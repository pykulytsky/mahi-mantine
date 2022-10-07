import {
  Checkbox,
  Container,
  Text,
  Group,
  ActionIcon,
  Stack,
  TypographyStylesProvider,
  Spoiler,
  Badge,
  Tooltip,
} from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editTask } from "../../../api/tasks.api"
import { useMatch } from "@tanstack/react-location"
import { showNotification } from "@mantine/notifications"
import { useContext, useEffect, useMemo, useState } from "react"
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd"
import { Task as TaskType } from "../../../types"
import { useStyles } from "./Task.styles"
import { SelectedTaskContext } from "../../../layout/LayoutProvider"
import { Drag, Task as IconTask, Calendar, Plus } from "../../icons"
import TagList from "../../tags/TagList/TagList"
import TaskMenu from "../TaskMenu/TaskMenu"
import ReactionList from "../../tags/Reaction/ReactionList"

export interface TaskProps extends TaskType {
  draggableHandleProps: DraggableProvidedDragHandleProps | null
  isDragging?: boolean
  disableAnimation?: boolean
}

export default function Task(props: TaskProps) {
  const { classes, cx, theme } = useStyles(!!props.draggableHandleProps)
  const { hovered, ref } = useHover()
  const queryClient = useQueryClient()
  const {
    params: { projectID: id },
  } = useMatch()
  const [isDone, setDone] = useState<boolean>(props.is_done)
  const { setSelectedTask } = useContext(SelectedTaskContext)

  useEffect(() => {
    setDone(props.is_done)
  }, [props.is_done])

  const extraActionsVisible = useMemo(() => {
    return !!props.tags.length || !!props.reactions.length || !!props.deadline
  }, [props.tags, props.reactions, props.deadline])

  const taskMutation = useMutation(editTask)

  function handleTaskStatus() {
    taskMutation.mutate(
      {
        id: props.id,
        is_done: !props.is_done,
      },
      {
        onSuccess: () => {
          setDone(!props.is_done)
          setTimeout(() => {
            if (!props.is_done) {
              showNotification({
                title: `Task #${props.id} was completed`,
                message: null,
                icon: <IconTask size={18} />,
              })
            }
            queryClient.invalidateQueries(["projects", { id: Number(id) }])
          }, 300)
        },
      }
    )
  }

  function toggleDetailAside(event: any) {
    if (
      event.target.classList.contains("mantine-Stack-root") ||
      event.target.classList.contains("mantine-Text-root")
    ) {
      setSelectedTask({
        id: props.id,
        projectID: props.project_id || id,
        color: theme.primaryColor,
      })
    }
  }

  return (
    <Container
      ref={ref}
      p={5}
      pl={!!props.draggableHandleProps ? 0 : "xs"}
      className={cx(classes.root, {
        [classes.draggingRoot]: props.isDragging,
      })}
      fluid
      onClick={toggleDetailAside}
    >
      <Group noWrap spacing={0}>
        {props.draggableHandleProps && (
          <ActionIcon
            aria-label="drag handle"
            variant="transparent"
            {...props.draggableHandleProps}
            className={cx(classes.dragControl, {
              [classes.dragControlUnvisible]: !hovered && !props.isDragging,
            })}
          >
            <Drag size={20} />
          </ActionIcon>
        )}

        <Stack
          sx={{
            width: "95%",
          }}
          align="self-start"
          spacing={0}
          p={0}
          m={0}
        >
          <Checkbox
            sx={{
              input: {
                border: props.is_important
                  ? `2px solid ${theme.colors.red[4]}`
                  : `2px solid ${
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[4]
                        : theme.colors.gray[5]
                    }`,
              },
            }}
            className={classes.task}
            checked={isDone}
            onChange={handleTaskStatus}
            size="md"
            label={
              <Text
                mt={-24} // 5.5.0 only
                color={props.is_done ? "dimmed" : ""}
                onClick={(e: any): void => {
                  e.preventDefault()
                }}
              >
                {props.name}
              </Text>
            }
          />
          {props.tags.length > 0 && (
            <Group spacing={5} ml={35}>
              {props.deadline && (
                <Tooltip position="bottom" label={props.deadline.toString()}>
                  <Badge
                    sx={{
                      paddingInline: 5,
                      span: {
                        lineHeight: 0.1,
                      },
                    }}
                    variant="dot"
                    color={
                      new Date(props.deadline) <= new Date() ? "red" : "green"
                    }
                  >
                    <Calendar size={15} />
                  </Badge>
                </Tooltip>
              )}
              <TagList tags={props.tags} />
              {props.reactions.length > 0 && (
                <ReactionList
                  reactions={props.reactions}
                  projectID={props.project_id || id}
                />
              )}
              {extraActionsVisible && (
                <Tooltip label="Add...">
                  <ActionIcon
                    size="sm"
                    variant="light"
                    color={theme.primaryColor}
                  >
                    <Plus size={20} />
                  </ActionIcon>
                </Tooltip>
              )}
            </Group>
          )}
          {props.description && (
            <Spoiler
              ml={35}
              maxHeight={0}
              showLabel="Show note"
              hideLabel="Hide"
            >
              <TypographyStylesProvider p={5} className={classes.description}>
                <div dangerouslySetInnerHTML={{ __html: props.description }} />
              </TypographyStylesProvider>
            </Spoiler>
          )}
        </Stack>
        <TaskMenu
          hovered={hovered}
          taskID={props.id}
          projectID={props.project_id}
        />
      </Group>
    </Container>
  )
}
