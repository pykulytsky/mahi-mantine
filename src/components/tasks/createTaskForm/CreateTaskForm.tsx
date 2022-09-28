import { Container, Group, Button, Transition } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useToggle } from "@mantine/hooks"
import ActionsGroup from "./ActionsGroup"
import TaskNameInputRTE from "./TaskNameInputRTE"
import RichTextEditor from "@mantine/rte"
import { CreateTaskFormType, Tag, Task } from "../../../types"
import { useApplyTagMutation, useTaskAddMutation } from "../../../queries/tasks"
import { useMatch } from "@tanstack/react-location"
import { useQueryClient } from "@tanstack/react-query"

export type CreateTaskFormProps = {
  sectionID?: number | string
  style?: React.CSSProperties
  toggleForm: () => void
}

export default function CreateTaskForm(props: CreateTaskFormProps) {
  const [noteIsShown, toggleNote] = useToggle()
  const tasksAddMutation = useTaskAddMutation()
  const applyTagMutation = useApplyTagMutation()
  const queryClient = useQueryClient()
  const {
    params: { projectID: id },
  } = useMatch()
  const form = useForm<CreateTaskFormType>({
    initialValues: {
      name: "",
      description: "",
      section_id: props.sectionID,
      tags: [],
    },
    validate: {
      name: (value) =>
        trimTitle().length > 1 && value.length > 0 && value !== "<p><br></p>"
          ? null
          : "Fill the title",
    },
  })

  function handleClose(e: any): void {
    e.preventDefault()
    props.toggleForm()
  }

  function trimTitle(): string {
    let value: string = form.getInputProps("name").value
    value = value.replaceAll("<p>", "")
    value = value.replaceAll("</p>", "")

    const re = new RegExp("<span.*</span>", "g")
    value = value.replaceAll(re, "")
    value = value.trim()

    return value
  }

  function applyTag(tag: Tag): void {
    form.insertListItem("tags", tag)
  }

  function handleAddTask(): void {
    tasksAddMutation.mutate(
      {
        name: trimTitle(),
        description: form.values.description,
        project_id: !props.sectionID ? id : undefined,
        section_id: props.sectionID,
      },
      {
        onSuccess: (data: Task) => {
          form.values.tags.forEach((tag) => {
            applyTagMutation.mutate({
              tag_id: tag.id,
              task_id: data.id,
            })
          })
          queryClient.invalidateQueries(["projects", { id }])
          props.toggleForm()
        },
      }
    )
  }

  return (
    <Container style={props.style} m="md" ml={0} mr={0} p="sm">
      <form>
        <TaskNameInputRTE
          onTagApply={(tag: Tag) => {
            applyTag(tag)
          }}
          {...form.getInputProps("name")}
        />
        <Transition
          mounted={noteIsShown}
          transition="pop"
          duration={400}
          timingFunction="ease-out"
        >
          {(styles) => (
            <RichTextEditor
              stickyOffset={props.sectionID ? 95 : 35}
              style={styles}
              mt="sm"
              {...form.getInputProps("description")}
            />
          )}
        </Transition>
        <Group mt="xs" position="apart">
          <ActionsGroup
            noteIsShown={noteIsShown}
            toggleNote={() => {
              toggleNote()
            }}
          />
          <Group spacing="sm" position="right">
            <Button onClick={handleClose} variant="subtle" color="red">
              Cancel
            </Button>
            <Button
              onClick={handleAddTask}
              variant="light"
              color="green"
              disabled={!form.isValid()}
            >
              Add
            </Button>
          </Group>
        </Group>
      </form>
    </Container>
  )
}
