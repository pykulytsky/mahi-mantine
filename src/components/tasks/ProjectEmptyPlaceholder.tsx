import { Text, Container } from "@mantine/core"
import sleepingllustration from "../../assets/illustrations/Sleeping Peacefully.svg"

export function ProjectEmptyPlaceholder() {
  return (
    <Container
      sx={{
        height: "300%",
        textAlign: "center",
        marginTop: "20vh",
        userSelect: "none",
        userDrag: "false",
        "-webkit-user-select": false,
        "-webkit-user-drag": false,
        pointerEvents: "none",
      }}
    >
      <img src={sleepingllustration} width="300" height="300" alt="" />
      <Text color="dimmed" italic>
        There is empty. How about plan your next travel?
      </Text>
    </Container>
  )
}
