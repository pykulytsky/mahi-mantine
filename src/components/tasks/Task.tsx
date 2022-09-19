import {
  Checkbox,
  createStyles,
  Container,
  Text,
  Group,
  ActionIcon,
  Stack,
  TypographyStylesProvider,
  useMantineTheme,
  Spoiler,
  Badge,
} from "@mantine/core"
import { DotsSixVertical } from "phosphor-react"
import { useHover } from "@mantine/hooks"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editTask } from "../../api/tasks.api"
import { useMatch, useNavigate } from "react-location"
import { showNotification } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons"
import { useEffect, useState } from "react"
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd"
import { Task as TaskType } from "../../types"

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

export interface TaskProps extends TaskType {
  draggableHandleProps: DraggableProvidedDragHandleProps | null
  isDragging?: boolean
  disableAnimation?: boolean
}

export default function Task(props: TaskProps) {
  const { classes, cx } = useStyles(!!props.draggableHandleProps)
  const theme = useMantineTheme()
  const { hovered, ref } = useHover()
  const queryClient = useQueryClient()
  const {
    params: { projectID: id },
  } = useMatch()
  const navigate = useNavigate()
  const [isDone, setDone] = useState<boolean>(props.is_done)

  useEffect(() => {
    setDone(props.is_done)
  }, [props.is_done])

  const taskMutation = useMutation(editTask, {
    onSuccess: () => {
      setDone(!props.is_done)
      setTimeout(() => {
        if (!props.is_done) {
          showNotification({
            title: `Task #${props.id} was completed`,
            message: null,
            icon: <IconCheck size={18} />,
          })
        }
        queryClient.invalidateQueries(["projects", { id }])
      }, 300)
    },
  })

  function handleTaskStatus() {
    taskMutation.mutate({
      id: props.id,
      is_done: !props.is_done,
    })
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

        <Stack
          sx={{
            width: "95%",
          }}
          align="stretch"
          spacing={0}
          p={0}
          m={0}
        >
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
            checked={isDone}
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
          {props.tags.length > 0 && (
            <Group spacing="sm" ml={35} mt="xs">
              {props.tags.map((tag) => (
                <Badge
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate({ to: `/app/tags/${tag.id}` })
                  }}
                  key={tag.id}
                  radius="md"
                  color={tag.color ?? undefined}
                >
                  #{tag.name}
                </Badge>
              ))}
            </Group>
          )}
          {props.description && (
            <Spoiler
              ml={35}
              mt="xs"
              maxHeight={0}
              showLabel="Show note"
              hideLabel="Hide"
            >
              <TypographyStylesProvider
                p={5}
                sx={{
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : "white",
                  borderRadius: theme.radius.md,
                  "h1, h2, h3, h4, p": {
                    marginTop: 0,
                  },
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: props.description }} />
              </TypographyStylesProvider>
            </Spoiler>
          )}
        </Stack>
      </Group>
    </Container>
  )
}
