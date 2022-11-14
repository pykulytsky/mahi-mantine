import { memo } from "react"
import { Stack } from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import {
  useTaskAssignMutation,
  useTaskAssignRemoveMutation,
} from "../../../queries/tasks"
import { User } from "../../../types"
import { UserCheckbox } from "../../user"
import { useQueryClient } from "@tanstack/react-query"

type UserAssignPickerProps = {
  taskID: number | string
  assignedTo: User[]
  participants: User[]
  owner?: User
  projectID: number | string
}

export default memo(function UserAssignPicker(props: UserAssignPickerProps) {
  const queryClient = useQueryClient()
  const currentUser: User | undefined = queryClient.getQueryData([
    "users",
    "me",
  ])
  const [loading, toggle] = useToggle()
  const assign = useTaskAssignMutation(props.projectID, props.taskID)
  const removeAssign = useTaskAssignRemoveMutation(
    props.projectID,
    props.taskID
  )

  function onAssignChange(id: number) {
    toggle()
    if (props.assignedTo.map((user) => user.id).includes(id)) {
      removeAssign.mutate(
        {
          task_id: Number(props.taskID),
          user_id: id,
        },
        {
          onSuccess: () => {
            setTimeout(() => {
              toggle()
            }, 100)
          },
          onError: () => {
            setTimeout(() => {
              toggle()
            }, 100)
          },
        }
      )
    } else {
      assign.mutate(
        {
          task_id: Number(props.taskID),
          user_id: id,
        },
        {
          onSuccess: () => {
            setTimeout(() => {
              toggle()
            }, 100)
          },
          onError: () => {
            setTimeout(() => {
              toggle()
            }, 100)
          },
        }
      )
    }
  }
  return (
    <Stack spacing={5}>
      {props.owner && (
        <UserCheckbox
          name={`${props.owner.first_name} ${props.owner.last_name}`}
          loading={loading}
          avatar={props.owner.avatar}
          isCurrentUser={
            currentUser !== undefined && props.owner.id == currentUser.id
          }
          onChange={() => {
            onAssignChange(props.owner?.id || -1)
          }}
          checked={props.assignedTo
            .map((user) => user.id)
            .includes(props.owner.id)}
        />
      )}
      {props.participants.map((user) => (
        <UserCheckbox
          key={user.id}
          name={`${user.first_name} ${user.last_name}`}
          isCurrentUser={currentUser !== undefined && user.id == currentUser.id}
          loading={loading}
          avatar={user.avatar}
          onChange={() => {
            onAssignChange(user.id)
          }}
          checked={props.assignedTo.map((user) => user.id).includes(user.id)}
        />
      ))}
    </Stack>
  )
})
