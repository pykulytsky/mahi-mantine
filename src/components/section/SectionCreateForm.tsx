import { ActionIcon, Button, Group, TextInput } from "@mantine/core"
import { X } from "phosphor-react"
import { FormEvent, useState } from "react"
import { useSectionMutation } from "../../queries/sections"

type SectionCreateFormProps = {
  projectID: number
  style?: React.CSSProperties
  toggleForm: () => void
}

export default function SectionCreateForm(props: SectionCreateFormProps) {
  const [name, setName] = useState("")
  const sectionAddMutation = useSectionMutation(props.projectID.toString())

  function onInput(event: FormEvent<HTMLInputElement>): void {
    setName(event.currentTarget.value)
  }

  function handleAddSection() {
    sectionAddMutation.mutate(
      {
        name,
        project_id: props.projectID,
      },
      {
        onSuccess: () => {
          props.toggleForm()
        },
      }
    )
  }

  return (
    <Group mt="sm" mb="sm" style={props.style} spacing="xs">
      <TextInput
        onChange={onInput}
        placeholder="Section name..."
        sx={{
          width: "80%",
        }}
      />
      <ActionIcon
        onClick={() => {
          props.toggleForm()
        }}
      >
        <X />
      </ActionIcon>
      <Button
        onClick={handleAddSection}
        disabled={name.length < 1}
        variant="light"
        color="green"
      >
        Create
      </Button>
    </Group>
  )
}