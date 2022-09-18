import { Container, Group, Button, Transition } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useToggle } from "@mantine/hooks"
import ActionsGroup from "./ActionsGroup"
import TaskNameInputRTE from "./TaskNameInputRTE"
import RichTextEditor from "@mantine/rte"
import { Tag } from "../../../types"

export type CreateTaskFormProps = {
  projectID?: number | string
  sectionID?: number | string
  style?: React.CSSProperties
  toggleForm: () => void
}

type CreateTaskFormType = {
  title: string
  description: string
  project_id?: number | string
  section_id?: number | string
  tags: Tag[]
}

export default function CreateTaskForm(props: CreateTaskFormProps) {
  const [noteIsShown, toggleNote] = useToggle()
  const form = useForm<CreateTaskFormType>({
    initialValues: {
      title: "",
      description: "",
      project_id: props.projectID,
      section_id: props.sectionID,
      tags: [],
    },
    validate: {
      title: (value) =>
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
    let value: string = form.getInputProps("title").value
    value = value.replaceAll("<p>", "")
    value = value.replaceAll("</p>", "")

    const re = new RegExp("<span.*</span>", "g")
    value = value.replaceAll(re, "")
    value = value.trim()

    return value
  }

  function applyTag(tag: Tag): void {
    console.log(tag)
  }

  return (
    <Container style={props.style} m="md" ml={0} mr={0} p="sm">
      <form>
        <TaskNameInputRTE
          onTagApply={(tag: Tag) => {
            applyTag(tag)
          }}
          {...form.getInputProps("title")}
        />
        <Transition
          mounted={noteIsShown}
          transition="pop"
          duration={400}
          timingFunction="ease-out"
        >
          {(styles) => (
            <RichTextEditor
              stickyOffset={props.sectionID ? 140 : 100}
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
              onClick={() => {
                console.log(trimTitle())
              }}
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
