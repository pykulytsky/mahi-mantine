import {
  Container,
  Group,
  Transition,
  ActionIcon,
  Checkbox,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useToggle } from "@mantine/hooks"
import TaskNameInputRTE from "./TaskNameInputRTE"
import RichTextEditor from "@mantine/rte"
import { CreateTaskFormType, Tag, Task } from "../../../types"
import { useApplyTagMutation, useTaskAddMutation } from "../../../queries/tasks"
import { useMatch } from "@tanstack/react-location"
import { useQueryClient } from "@tanstack/react-query"
import { Menu } from "../../icons"
import { useUser } from "../../../queries/user"

export type CreateTaskFormProps = {
  sectionID?: number | string
  style?: React.CSSProperties
  toggleForm: () => void
}

export default function CreateTaskForm(props: CreateTaskFormProps) {
  const [noteIsShown, toggleNote] = useToggle()
  const { data } = useUser()
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
      owner_id: data?.id || undefined,
    },
    validate: {
      name: (value) =>
        trimTitle().length > 1 && value.length > 0 && value !== "<p><br></p>"
          ? null
          : "Fill the title",
    },
  })

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
        owner_id: form.values.owner_id,
      },
      {
        onSuccess: (data: Task) => {
          if (form.values.tags.length < 1) {
            props.toggleForm()
            queryClient.invalidateQueries(["projects", { id: Number(id) }])
            return
          }
          form.values.tags.forEach((tag, index) => {
            applyTagMutation.mutate({
              tag_id: tag.id,
              task_id: data.id,
            })
            if (index === form.values.tags.length - 1) {
              props.toggleForm()
              setTimeout(() => {
                queryClient.invalidateQueries(["projects", { id: Number(id) }])
              }, 1)
            }
          })
        },
      }
    )
  }

  return (
    <Container style={props.style} m={0} ml={13}>
      <form>
        <Group noWrap position="apart" spacing={0}>
          <Checkbox
            size="md"
            radius={10}
            sx={{
              input: {
                border: `2px solid gray`,
              },
            }}
          />
          <TaskNameInputRTE
            onSubmit={() => {
              if (form.values.name.length > 1) handleAddTask()
            }}
            onTagApply={(tag: Tag) => {
              applyTag(tag)
            }}
            toggleForm={props.toggleForm}
            {...form.getInputProps("name")}
          />
          <ActionIcon>
            <Menu size={20} />
          </ActionIcon>
        </Group>
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
      </form>
    </Container>
  )
}
