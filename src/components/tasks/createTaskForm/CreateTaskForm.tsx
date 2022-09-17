import { Container, Group, Button, Transition } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useToggle } from "@mantine/hooks"
import ActionsGroup from "./ActionsGroup"
import TaskNameInputRTE from "./TaskNameInputRTE"
import RichTextEditor from "@mantine/rte"

export type CreateTaskFormProps = {
  projectID?: number | string
  sectionID?: number | string
  style?: React.CSSProperties
  toggleForm: () => void
}

export default function CreateTaskForm(props: CreateTaskFormProps) {
  const [noteIsShown, toggleNote] = useToggle()
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      project_id: props.projectID,
      section_id: props.sectionID,
    },
    validate: {
      title: (value) =>
        value.length > 0 && value !== "<p><br></p>" ? null : "Fill the title",
    },
  })

  function handleClose(e: any) {
    e.preventDefault()
    props.toggleForm()
  }

  return (
    <Container style={props.style} m="md" ml={0} mr={0} p="sm">
      <form>
        <TaskNameInputRTE {...form.getInputProps("title")} />
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
                console.log(form.getInputProps("description"))
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
