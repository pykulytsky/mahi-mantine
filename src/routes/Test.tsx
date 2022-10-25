import { showNotification } from "@mantine/notifications"
import { Button, Checkbox } from "@mantine/core"
import { useSearch } from "@tanstack/react-location"
import { LocationGenerics } from "../router"
import { SortableTree } from "../components/dnd"

export default function Test() {
  const search = useSearch<LocationGenerics>()
  return (
    <>
      <h1>{JSON.stringify(search)}</h1>
      <SortableTree />
    </>
  )
}
