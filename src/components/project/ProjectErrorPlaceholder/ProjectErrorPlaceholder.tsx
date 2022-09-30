import { Text, Container, Group, Button } from "@mantine/core"
import care from "../../../assets/illustrations/Care.svg"
import { useStyles } from "./ProjectErrorPlaceholder.styles"

export function ProjectErrorPlaceholder() {
  const { classes } = useStyles()
  return (
    <>
      <Container className={classes.container}>
        <img src={care} width="300" height="300" alt="" />
        <Text color="dimmed" italic>
          We can't find project you are looking for.
        </Text>
      </Container>
      <Group mt="lg" position="center">
        <Button variant="light">All projects</Button>
        <Button variant="default">Search</Button>
      </Group>
    </>
  )
}
