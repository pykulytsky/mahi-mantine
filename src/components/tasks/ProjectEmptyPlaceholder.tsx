import { Title, Container } from "@mantine/core"
import ideaIllustration from "../../assets/illustrations/1.svg"

export function ProjectEmptyPlaceholder() {
  return (
    <Container
      sx={{
        height: "300%",
        textAlign: "center",
        marginTop: "20vh",
      }}
    >
      <img src={ideaIllustration} width="300" height="300" alt="" />
      <Title order={5}>There is empty. How about plan your next travel?</Title>
    </Container>
  )
}
