import { Center, Group, Text, Stack, Button } from "@mantine/core"
import frog from "../assets/illustrations/Frog 01.svg"

export default function NotFound() {
  return (
    <Center
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Group spacing={0}>
        <Stack spacing={0} pl={50} sx={{ width: "50%" }}>
          <Text weight={700} size={55}>
            You have reached
          </Text>
          <Text weight={700} size={55}>
            the end
          </Text>
          <Text weight={700} size={55}>
            of the world!
          </Text>
          <Text weight={500}>
            Oops! We can seem to find the page what you are looking for. It
            might have been removed or it is temporary unavaliable.
          </Text>
          <Group p="xl">
            <Button size="lg">Go to home page</Button>
            <Button size="lg">Need a help?</Button>
          </Group>
        </Stack>
        <img
          style={{ userSelect: "none" }}
          src={frog}
          alt=""
          width="50%"
          height={700}
        />
      </Group>
    </Center>
  )
}
