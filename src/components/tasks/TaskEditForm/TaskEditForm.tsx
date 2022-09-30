import { Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useFocusWithin, usePrevious } from "@mantine/hooks"
import { useEffect } from "react"
import { Task } from "../../../types"

export default function TaskEditForm(props: Task) {
  const form = useForm<Task>({
    initialValues: {
      ...props,
    },
  })
  const { ref, focused } = useFocusWithin()
  const previousFocusedState = usePrevious(focused)

  useEffect(() => {
    form.setValues(props)
  }, [props])

  useEffect(() => {
    if (previousFocusedState !== undefined && previousFocusedState) {
      console.log(form.values.name)
    }
  }, [focused])

  return (
    <form>
      <Textarea
        ref={ref}
        variant={focused ? "default" : "unstyled"}
        size="xl"
        {...form.getInputProps("name")}
        autosize
        minRows={1}
        maxRows={5}
      />
    </form>
  )
}
