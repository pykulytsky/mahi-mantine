import {
  Button,
  Group,
  Popover,
  Stack,
  Switch,
  TextInput,
  useMantineTheme,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { ProjectCreate } from "../../../types"
import { ProjectButton } from "../ProjectButton"
import ColorPicker from "../projectEditForms/ColorPicker/ColorPicker"
// @ts-ignore
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"

type ProjectCreateFormProps = {
  onSubmit: (project: ProjectCreate) => void
}

export default function ProjectCreateForm(props: ProjectCreateFormProps) {
  const theme = useMantineTheme()
  const form = useForm<ProjectCreate>({
    initialValues: {
      name: "",
      accent_color: undefined,
      icon: undefined,
      is_favorite: false,
    },
  })

  function onEmojiSelect(emojiData: any) {
    form.setValues({ icon: emojiData.native })
  }

  function createProject() {
    props.onSubmit(form.values)
  }

  return (
    <Stack>
      <Group noWrap position="apart">
        <Popover>
          <Popover.Target>
            <ProjectButton
              size={65}
              color={form.values.accent_color}
              icon={form.values.icon}
              variant="filled"
            />
          </Popover.Target>
          <Popover.Dropdown>
            <Picker
              perLine={8}
              previewPosition="none"
              theme={theme.colorScheme}
              data={data}
              onEmojiSelect={onEmojiSelect}
            />
          </Popover.Dropdown>
        </Popover>
        <ColorPicker updateProject={form.setValues} />
      </Group>
      <TextInput
        variant="filled"
        size="md"
        placeholder="Project name..."
        {...form.getInputProps("name")}
      />
      <Switch
        {...form.getInputProps("is_favorite")}
        label="Add to favorites"
        color={form.values.accent_color || theme.primaryColor}
      />
      <Button
        onClick={createProject}
        size="lg"
        radius="lg"
        fullWidth
        variant="filled"
        color="green"
      >
        Create
      </Button>
    </Stack>
  )
}
