import {
  Button,
  Group,
  Popover,
  Stack,
  Switch,
  TextInput,
  useMantineTheme,
} from "@mantine/core"
import { closeAllModals } from "@mantine/modals"
import { useForm } from "@mantine/form"
import { ProjectCreate } from "../../../types"
import { ProjectButton } from "../ProjectButton"
import ColorPicker from "../projectEditForms/ColorPicker/ColorPicker"
// @ts-ignore
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"

export default function ProjectCreateForm() {
  const theme = useMantineTheme()
  const form = useForm<ProjectCreate>({
    initialValues: {
      name: undefined,
      accent_color: undefined,
      icon: undefined,
    },
  })

  function onEmojiSelect(emojiData: any) {
    form.setValues({ icon: emojiData.native })
  }

  function createProject() {
    
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
      <Switch label="Add to favorites" />
      <Button size="lg" radius="lg" fullWidth variant="filled" color="green">
        Create
      </Button>
    </Stack>
  )
}
