import {
  Badge,
  Button,
  Center,
  Chip,
  Group,
  Popover,
  Space,
  Table,
  Textarea,
} from "@mantine/core"
import { Calendar, DatePicker } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { useFocusWithin, usePrevious } from "@mantine/hooks"
import { useEffect } from "react"
import { AsideTask } from "../../../layout/LayoutProvider"
import { useTaskEditMutation } from "../../../queries/tasks"
import { Task } from "../../../types"
import { Tag, Alert, Deadline, Alarm, Pen, Close } from "../../icons"
import ProjectSelect from "../../project/ProjectSelect/ProjectSelect"
import TagList from "../../tags/TagList/TagList"
import { useStyles } from "./TaskEditForm.styles"

export default function TaskEditForm(props: AsideTask) {
  const { mutate } = useTaskEditMutation(props.projectID)
  const form = useForm<Task>({
    initialValues: {
      ...props,
    },
  })
  const { ref, focused } = useFocusWithin()
  const previousFocusedState = usePrevious(focused)

  const { classes } = useStyles()

  useEffect(() => {
    form.setValues(props)
  }, [props])

  useEffect(() => {
    if (previousFocusedState !== undefined && previousFocusedState) {
      if (form.values.name !== props.name)
        mutate({ id: props.id, name: form.values.name })
    }
  }, [focused])

  function onImportanceUpdate(value: boolean) {
    mutate(
      { id: props.id, is_important: value },
      {
        onSuccess: (data: Task) => {
          form.setValues(data)
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
        },
      }
    )
  }

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
        <ProjectSelect {...props} />
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
              <TagList editable tags={props.tags} />
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
            <td>
              <Popover position="top" width={300} withArrow shadow="md">
                <Popover.Target>
                  <Badge
                    rightSection={
                      props.deadline ? (
                        <Center
                          onClick={() => {
                            onDeadlineUpdate(null)
                          }}
                          inline
                        >
                          <Close size={15} />
                        </Center>
                      ) : undefined
                    }
                    sx={{
                      cursor: "pointer",
                      paddingRight: props.deadline ? 3 : 5,
                    }}
                    variant={props.deadline ? "light" : "outline"}
                  >
                    {props.deadline?.toString() || "Add deadline"}
                  </Badge>
                </Popover.Target>
                <Popover.Dropdown>
                  <Calendar
                    className={classes.calendar}
                    value={
                      form.values.deadline
                        ? new Date(form.values.deadline)
                        : null
                    }
                    onChange={onDeadlineUpdate}
                  />
                </Popover.Dropdown>
              </Popover>
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
