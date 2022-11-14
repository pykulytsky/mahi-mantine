import {
  Autocomplete,
  Button,
  CheckIcon,
  Container,
  Group,
  Loader,
  Text,
} from "@mantine/core"
import { useDebouncedState, useToggle } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { getUsersByEmail } from "../../../api/user.api"
import { useAddUserMutation } from "../../../queries/projects"
import { useMatch } from "@tanstack/react-location"
import { showNotification } from "@mantine/notifications"
import { Alert } from "../../icons"

export default function EmailPanel() {
  const {
    params: { projectID },
  } = useMatch()

  const [value, setValue] = useDebouncedState<string>("", 300)
  const [users, setUsers] = useState<string[]>([])
  const [isFetching, toggle] = useToggle()

  const { mutate } = useAddUserMutation(projectID)

  useEffect(() => {
    if (value.length > 2) {
      toggle()
      getUsersByEmail(value)
        .then((data) => {
          setUsers(data.map((user) => user.email))
          toggle()
        })
        .catch(() => {
          toggle()
        })
    }
  }, [value])

  function onDirectInvite() {
    if (users.includes(value)) {
      mutate(
        {
          id: Number(projectID),
          email: value,
        },
        {
          onSuccess: () => {
            showNotification({
              message: "New user was added to your project",
              color: "green",
              icon: <CheckIcon width={10} height={10} />,
            })
          },
          onError: () => {
            showNotification({
              title: "Error while adding new user",
              message:
                "No avaliable user found with given email. Perhaps you made typo or user is already in project.",
              color: "red",
              icon: <Alert color="white" size={20} />,
            })
          },
        }
      )
    } else {
      showNotification({
        title: "Error while adding new user",
        message: "No user found with given email",
        color: "red",
        icon: <Alert color="white" size={20} />,
      })
    }
  }

  return (
    <Container>
      <Text my="sm">
        Find user using input bellow. Invited users is going to receive
        invitation message and accept it.
      </Text>
      <Group noWrap spacing={5}>
        <Autocomplete
          defaultValue={value}
          onChange={(value) => setValue(value)}
          data={users}
          limit={3}
          nothingFound="No users found"
          transition="pop-top-left"
          transitionDuration={80}
          transitionTimingFunction="ease"
          placeholder="Search users"
          rightSection={isFetching ? <Loader size="xs" /> : undefined}
        />
        <Button onClick={onDirectInvite}>Invite</Button>
      </Group>
    </Container>
  )
}
