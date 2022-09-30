import {
  useMantineTheme,
  Container,
  Title,
  ColorSwatch,
  Group,
  CheckIcon,
  Transition,
} from "@mantine/core"
import { ProjectEdit } from "../../../../types"
import { useStyles } from "./ColorPicker.styles"


type ColorPickerProps = {
  color?: string
  updateProject: (project: ProjectEdit) => void
}

export default function ColorPicker(props: ColorPickerProps) {
  const theme = useMantineTheme()
  const { classes } = useStyles()

  const swatches = Object.keys(theme.colors).map((color) => (
    <ColorSwatch
      className={classes.swatch}
      size={30}
      key={color}
      color={theme.colors[color][6]}
      onClick={() => {
        onColorChange(color)
      }}
    >
      <Transition
        mounted={color === props.color}
        transition="slide-up"
        duration={300}
        timingFunction="linear"
      >
        {(styles) => <CheckIcon style={styles} color="white" width={15} />}
      </Transition>
    </ColorSwatch>
  ))

  function onColorChange(color: string): void {
    props.updateProject({ accent_color: color })
  }

  return (
    <Container p={0} pl="lg" pr="lg" mb="sm" mt="sm">
      <Title m="sm" order={5}>
        Pick a color
      </Title>
      <Group mb="xs" position="apart" spacing="xs">
        {swatches.slice(0, 7)}
      </Group>
      <Group position="apart" spacing="xs">
        {swatches.slice(7, 14)}
      </Group>
    </Container>
  )
}
