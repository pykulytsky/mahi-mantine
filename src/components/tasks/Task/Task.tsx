import {
  Checkbox,
  createStyles,
  Container,
  Text,
  Group,
  ActionIcon,
  Stack,
  TypographyStylesProvider,
  Spoiler,
  Badge,
  Box,
} from "@mantine/core"
import { DotsSixVertical } from "phosphor-react"
import { useHover } from "@mantine/hooks"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editTask } from "../../../api/tasks.api"
import { useMatch, useNavigate } from "@tanstack/react-location"
import { showNotification } from "@mantine/notifications"
import { IconCheck, IconDots } from "@tabler/icons"
import { useContext, useEffect, useState } from "react"
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd"
import { Task as TaskType } from "../../../types"
import { useStyles } from "./Task.styles"
import { AsideContext } from "../../../layout/LayoutProvider"
import { Menu } from "../../icons"
import TagList from "../../tags/TagList/TagList"

export interface TaskProps extends TaskType {
  draggableHandleProps: DraggableProvidedDragHandleProps | null
  isDragging?: boolean
  disableAnimation?: boolean
}

export default function Task(props: TaskProps) {
  const { classes, cx } = useStyles(!!props.draggableHandleProps)
  const { hovered, ref } = useHover()
  const queryClient = useQueryClient()
  const {
    params: { projectID: id },
  } = useMatch()
  const navigate = useNavigate()
  const [isDone, setDone] = useState<boolean>(props.is_done)
  const { data, setData } = useContext(AsideContext)

  useEffect(() => {
    setDone(props.is_done)
  }, [props.is_done])

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
                icon: <IconCheck size={18} />,
              })
            }
            queryClient.invalidateQueries(["projects", { id }])
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
      setData({ projectID: id, ...props })
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
            <DotsSixVertical size={18} />
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
            className={classes.task}
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
              // <Textarea
              //   sx={{
              //     width: "58vw",
              //     input: {
              //       border: "none",
              //     },
              //   }}
              //   radius="md"
              //   size="md"
              //   variant="unstyled"
              //   value={props.name}
              //   autosize
              //   minRows={1}
              // />
            }
          />
          {props.tags.length > 0 && (
            <Box ml={35}>
              <TagList tags={props.tags} />
            </Box>
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
        <ActionIcon
          sx={{
            opacity: hovered ? 1 : 0,
            transition: "opacity .2s linear",
          }}
        >
          <Menu size={20} />
        </ActionIcon>
      </Group>
    </Container>
  )
}
