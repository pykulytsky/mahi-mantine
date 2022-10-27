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
  Avatar,
} from "@mantine/core"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editTask } from "../../../api/tasks.api"
import { useMatch } from "@tanstack/react-location"
import { showNotification } from "@mantine/notifications"
import { useEffect, useMemo, useState, memo } from "react"
import type { Task as TaskType } from "../../../types"
import { useStyles } from "./Task.styles"
import { Task as IconTask, Calendar, Plus, ArrowDown } from "../../icons"
import TagList from "../../tags/TagList/TagList"
import TaskMenu from "../TaskMenu/TaskMenu"
import ReactionList from "../../tags/Reaction/ReactionList"
import { useStore } from "../../../store/taskContext"

export interface TaskProps extends TaskType {
  onCollapse?(): void
  collapsed?: boolean
}

export default memo(function Task(props: TaskProps) {
  const [_, setTaskStore] = useStore()
  const { classes, cx, theme } = useStyles()
  const queryClient = useQueryClient()
  const {
    params: { projectID: id },
  } = useMatch()
  const [isDone, setDone] = useState<boolean>(props.is_completed)

  useEffect(() => {
    setDone(props.is_completed)
  }, [props.is_completed])

  const extraActionsVisible = useMemo(() => {
    return (
      !!props.tags.length ||
      !!props.reactions.length ||
      !!props.deadline ||
      !!props.assigned_to.length
    )
  }, [props.tags, props.reactions, props.deadline, props.assigned_to])

  const taskMutation = useMutation(editTask)

  function handleTaskStatus() {
    taskMutation.mutate(
      {
        id: props.id,
        is_completed: !props.is_completed,
      },
      {
        onSuccess: () => {
          setDone(!props.is_completed)
          setTimeout(() => {
            if (!props.is_completed) {
              showNotification({
                title: `Task #${props.id} was completed`,
                message: null,
                icon: <IconTask color="white" size={18} />,
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
      (event.target.classList.contains("mantine-Text-root") &&
        !event.target.classList.contains("mantine-Spoiler-control"))
    ) {
      setTaskStore({
        id: props.id,
        projectID: props.project_id || id,
        color: theme.primaryColor,
      })
    }
  }

  return (
    <Container className={classes.root} fluid onClick={toggleDetailAside}>
      <Group noWrap spacing={0} align="flex-start">
        {props.onCollapse && (
          <ActionIcon
            mt={3}
            onClick={() => {
              if (props.onCollapse) props.onCollapse()
              taskMutation.mutate({
                id: props.id,
                is_collapsed: !props.collapsed,
              })
            }}
            className={cx(classes.collapse, {
              [classes.collapsed]: props.collapsed,
            })}
          >
            <ArrowDown size={20} />
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
            radius={10}
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
                color={props.is_completed ? "dimmed" : ""}
                onClick={(e: any): void => {
                  e.preventDefault()
                }}
              >
                {props.name}
              </Text>
            }
          />
          {extraActionsVisible && (
            <Group spacing={5} ml={35}>
              {props.assigned_to.length && (
                <Tooltip position="bottom" label="Assignees">
                  <Badge
                    variant="light"
                    size="lg"
                    styles={{
                      inner: {
                        textTransform: "none",
                      },
                    }}
                    leftSection={
                      <Avatar.Group ml={-10}>
                        {props.assigned_to.map((user) => (
                          <Avatar
                            radius="lg"
                            variant="gradient"
                            key={user.id}
                            size={22}
                            src={user.avatar}
                            sx={{
                              border: 0,
                            }}
                          />
                        ))}
                      </Avatar.Group>
                    }
                  >
                    <Group spacing={5}>
                      {props.assigned_to.map((user) => (
                        <Text weight={500} key={user.id}>
                          {user.first_name} {user.last_name}
                        </Text>
                      ))}
                    </Group>
                  </Badge>
                </Tooltip>
              )}
              {props.deadline && (
                <Tooltip position="bottom" label={props.deadline.toString()}>
                  <Badge
                    className={classes.deadline}
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
        <Group mt={3}>
          <TaskMenu taskID={props.id} projectID={id} />
        </Group>
      </Group>
    </Container>
  )
})
