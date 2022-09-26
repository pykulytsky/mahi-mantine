import {
  useMantineColorScheme,
  Container,
} from "@mantine/core"
import ColorSchemeSwitch from "../components/core/ColorSchemeSwitch/ColorSchemeSwitch"

export default function About() {

  return (
    <Container>
      <ColorSchemeSwitch />
    </Container>
  )
}
