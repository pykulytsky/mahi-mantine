import { Container, useMantineTheme } from "@mantine/core"
import { ProjectEdit } from "../../../types"
import ColorPicker from "./ColorPicker"
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"

type ColorEmojiPickerProps = {
  emoji?: string
  color?: string
  updateProject: (project: ProjectEdit) => void
}

export default function ColorEmojiPicker(props: ColorEmojiPickerProps) {
  const theme = useMantineTheme()

  function onEmojiClick(emojiData: any) {
    props.updateProject({ icon: emojiData.native })
  }

  return (
    <Container p={0}>
      <Picker
        theme={theme.colorScheme}
        data={data}
        onEmojiSelect={onEmojiClick}
      />
      <ColorPicker updateProject={props.updateProject} color={props.color} />
    </Container>
  )
}
