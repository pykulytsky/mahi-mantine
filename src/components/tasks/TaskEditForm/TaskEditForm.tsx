import { Table, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useFocusWithin, usePrevious } from "@mantine/hooks"
import { useEffect } from "react"
import { AsideTask } from "../../../layout/LayoutProvider"
import { useTaskEditMutation } from "../../../queries/tasks"
import { Task } from "../../../types"
import TagList from "../../tags/TagList/TagList"
import { useStyles } from "./TaskEditForm.styles"

export default function TaskEditForm(props: AsideTask) {
  const taskMutation = useTaskEditMutation(props.projectID)
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
        taskMutation.mutate({ id: props.id, name: form.values.name })
    }
  }, [focused])

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
      <Table>
        <tbody>
          <tr key="tags">
            <td>Tags</td>
            <td>
              <TagList editable tags={props.tags} />
            </td>
          </tr>
          <tr key="deadline">
            <td>Deadline</td>
            <td>15/09/2023</td>
          </tr>
        </tbody>
      </Table>
    </form>
  )
}
