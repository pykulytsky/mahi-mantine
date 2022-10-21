import { showNotification } from "@mantine/notifications"
import { Button, Checkbox } from "@mantine/core"
import { useSearch } from "@tanstack/react-location"
import { LocationGenerics } from "../router"

export default function Test() {
  const search = useSearch<LocationGenerics>()
  return (
    <>
      <h1>{JSON.stringify(search)}</h1>
      <Button
        onClick={() => {
          showNotification({
            title: "test",
            message: <Checkbox label="Test task with some info" />,
          })
        }}
      >
        test
      </Button>
    </>
  )
}
