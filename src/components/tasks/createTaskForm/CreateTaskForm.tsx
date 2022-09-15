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
      title: (value) => (value.length > 0 ? null : "Fill the title"),
    },
  })
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
        <Group mt="md" position="apart">
          <ActionsGroup
            noteIsShown={noteIsShown}
            toggleNote={() => {
              toggleNote()
            }}
          />
          <Group spacing="sm" position="right">
            <Button variant="subtle" color="red">
              Cancel
            </Button>
            <Button variant="light" color="green">
              Add
            </Button>
          </Group>
        </Group>
      </form>
    </Container>
  )
}
