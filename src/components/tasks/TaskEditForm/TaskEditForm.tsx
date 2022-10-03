import {
  Badge,
  Box,
  Button,
  Center,
  Chip,
  Group,
  Loader,
  Popover,
  Space,
  Table,
  Text,
  Textarea,
} from "@mantine/core"
import { Calendar, DatePicker } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { useFocusWithin, usePrevious } from "@mantine/hooks"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"
import { SelectedTask } from "../../../layout/LayoutProvider"
import { useTaskEditMutation, useTaskQuery } from "../../../queries/tasks"
import { Task, TaskEdit } from "../../../types"
import { Tag, Alert, Deadline, Alarm, Pen, Close } from "../../icons"
import ProjectSelect from "../../project/ProjectSelect/ProjectSelect"
import TagList from "../../tags/TagList/TagList"
import { useStyles } from "./TaskEditForm.styles"

export default function TaskEditForm(props: SelectedTask) {
  const queryClient = useQueryClient()
  const { data, isError, isLoading } = useTaskQuery(props.id)
  const { mutate } = useTaskEditMutation(props.projectID)
  const form = useForm<TaskEdit>({
    initialValues: {
      ...data,
    },
  })
  const { ref, focused } = useFocusWithin()
  const previousFocusedState = usePrevious(focused)

  const { classes, theme } = useStyles()

  const deadline = useMemo(() => {
    const value = data?.deadline ? new Date(data.deadline) : null
    return value
  }, [data?.deadline])

  useEffect(() => {
    form.setValues({ ...data })
  }, [data])

  useEffect(() => {
    if (previousFocusedState !== undefined && previousFocusedState) {
      if (form.values.name !== data?.name)
        mutate(
          { id: props.id, name: form.values.name },
          {
            onSuccess: (data: Task) => {
              queryClient.setQueryData(["tasks", { id: data.id }], data)
            },
          }
        )
    }
  }, [focused])

  function onImportanceUpdate(value: boolean) {
    mutate(
      { id: props.id, is_important: value },
      {
        onSuccess: (data: Task) => {
          form.setValues({ is_important: data.is_important })
          queryClient.setQueryData(["tasks", { id: data.id }], data)
        },
      }
    )
  }
  function onDeadlineUpdate(value: Date | null) {
    mutate(
      { id: props.id, deadline: value ? value.getTime() : null },
      {
        onSuccess: (data: Task) => {
          form.setValues(data)
          queryClient.setQueryData(["tasks", { id: data.id }], data)
        },
      }
    )
  }
  if (isLoading)
    return (
      <Center>
        <Loader />
      </Center>
    )
  if (isError) return <h1>Error</h1> // TODO set error placeholder
  return (
    <form>
      <Textarea
        className={classes.nameInput}
        ref={ref}
        variant={focused ? "default" : "unstyled"}
        size="xl"
        {...form.getInputProps("name")}
        autosize
        minRows={1}
        maxRows={4}
      />
      <Group my="md" ml="sm" position="apart">
        <ProjectSelect
          order={data.order}
          project_id={props.projectID.toString()}
          section_id={data.section_id}
        />
        <Button variant="subtle" leftIcon={<Pen size={15} />}>
          Edit note
        </Button>
      </Group>
      <Table
        // @ts-ignore
        withColumnBorders
        className={classes.table}
        verticalSpacing="md"
        fontSize="md"
      >
        <tbody>
          <tr key="tags">
            <td>
              <Center inline>
                <Tag size={18} />
                <Space w="xs" />
                Tags
              </Center>
            </td>
            <td>
              <TagList editable tags={data.tags} />
            </td>
          </tr>
          <tr key="importance">
            <td>
              <Center inline>
                <Alert size={18} />
                <Space w="xs" />
                Importance
              </Center>
            </td>
            <td>
              <Chip
                onChange={onImportanceUpdate}
                checked={form.values.is_important}
              >
                {form.values.is_important ? "true" : "false"}
              </Chip>
            </td>
          </tr>
          <tr key="deadline">
            <td>
              <Center inline>
                <Deadline size={18} />
                <Space w="xs" />
                Deadline
              </Center>
            </td>
            <td className={classes.deadlineCell}>
              <Popover position="top" width={300} withArrow shadow="md">
                <Popover.Target>
                  <Box>
                    <Badge
                      sx={{
                        marginBottom: 5,
                        marginLeft: 5,
                        cursor: "pointer",
                        paddingRight: deadline ? 3 : 5,
                        borderRadius: deadline ? "10px 0 0 10px" : "10px",
                      }}
                      variant={deadline ? "light" : "outline"}
                    >
                      {deadline?.toISOString() || "Add deadline"}
                    </Badge>
                  </Box>
                </Popover.Target>
                <Popover.Dropdown>
                  <Calendar
                    className={classes.calendar}
                    value={deadline}
                    onChange={onDeadlineUpdate}
                  />
                </Popover.Dropdown>
              </Popover>
              {deadline && (
                <Badge
                  onClick={() => {
                    onDeadlineUpdate(null)
                  }}
                  className={classes.deadlineRemove}
                >
                  x
                </Badge>
              )}
            </td>
          </tr>
          <tr key="remind">
            <td>
              <Center inline>
                <Alarm size={18} />
                <Space w="xs" />
                Remind
              </Center>
            </td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </form>
  )
}
