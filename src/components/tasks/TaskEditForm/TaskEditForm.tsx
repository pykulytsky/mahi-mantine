import { Center, Chip, Space, Table, Textarea } from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { useFocusWithin, usePrevious } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { AsideTask } from "../../../layout/LayoutProvider"
import { useTaskEditMutation } from "../../../queries/tasks"
import { Task, Tag as TagType } from "../../../types"
import { Tag, Alert } from "../../icons"
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
    console.log(props.deadline)
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
  function onDeadlineUpdate(value: Date) {
    mutate({ id: props.id, deadline: value.getTime() })
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
        maxRows={5}
      />
      <Table verticalSpacing="md" fontSize="md">
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
                <Alert size={18} />
                <Space w="xs" />
                Deadline
              </Center>
            </td>
            <td>
              <DatePicker
                clearable
                size="xs"
                dropdownType="modal"
                placeholder="Select deadline"
                value={props.deadline}
                onChange={onDeadlineUpdate}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </form>
  )
}
