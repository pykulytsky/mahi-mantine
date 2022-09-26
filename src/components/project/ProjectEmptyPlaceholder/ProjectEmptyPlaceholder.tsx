import { Text, Container } from "@mantine/core"
import sleepingllustration from "../../../assets/illustrations/Sleeping Peacefully.svg"
import { useStyles } from "./ProjectEmptyPlaceholder.styles"

export function ProjectEmptyPlaceholder() {
  const { classes } = useStyles()
  return (
    <Container className={classes.container}>
      <img src={sleepingllustration} width="300" height="300" alt="" />
      <Text color="dimmed" italic>
        There is empty. How about plan your next travel?
      </Text>
    </Container>
  )
}
