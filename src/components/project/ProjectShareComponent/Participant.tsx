import {
  Anchor,
  Avatar,
  Badge,
  CloseButton,
  Group,
  Stack,
  Text,
  Tooltip,
  CheckIcon,
  Loader,
  ThemeIcon,
} from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { openConfirmModal } from "@mantine/modals"
import { showNotification } from "@mantine/notifications"
import { useMatch } from "@tanstack/react-location"
import { useUserRemoveMutation } from "../../../queries/projects"
import { Alert } from "../../icons"

type ParticipantProps = {
  name: string
  avatar?: string
  email: string
  isOwner?: boolean
}

export default function Participant(props: ParticipantProps) {
  const {
    params: { projectID },
  } = useMatch()
  const { mutate } = useUserRemoveMutation(projectID)
  const [mutating, toggle] = useToggle()

  const openModal = () =>
    openConfirmModal({
      title: "Please confirm your action",
      centered: true,
      children: (
        <Text size="md">
          Are you shure you want to remove{" "}
          <Text inherit component="span" color="red">
            {props.name}
          </Text>{" "}
          from this project?
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => {
        removeUser()
      },
    })

  function removeUser() {
    toggle()
    mutate(
      {
        id: Number(projectID),
        email: props.email,
      },
      {
        onSuccess: () => {
          showNotification({
            title: "User removed",
            message: "User was successfully remoced from project.",
            color: "green",
            icon: <CheckIcon width={10} height={10} />,
          })
          toggle()
        },
        onError: () => {
          showNotification({
            title: "Error while removing user",
            message:
              "An error occured while removing user from project, please try again",
            color: "red",
            icon: <Alert size={20} color="white" />,
          })
          toggle()
        },
      }
    )
  }
  return (
    <Group position="apart">
      <Group spacing="xs">
        <Avatar src={props.avatar} />
        <Stack spacing={0}>
          <Group>
            <Anchor
              weight={500}
              underline={false}
              sx={(theme) => ({
                "&:hover": {
                  color: theme.colors[theme.primaryColor][4],
                },
              })}
            >
              {props.name}
            </Anchor>
            {props.isOwner && <Badge>owner</Badge>}
          </Group>
          <Text size="xs">{props.email}</Text>
        </Stack>
      </Group>
      {!props.isOwner && (
        <Tooltip label="Remove user">
          {mutating ? (
            <ThemeIcon variant="light" color="red">
              <Loader size="xs" color="red" />
            </ThemeIcon>
          ) : (
            <CloseButton variant="light" color="red" onClick={removeUser} />
          )}
        </Tooltip>
      )}
    </Group>
  )
}
