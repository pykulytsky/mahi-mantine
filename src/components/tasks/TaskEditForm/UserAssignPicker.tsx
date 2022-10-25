import { Stack } from "@mantine/core"
import {
  useTaskAssignMutation,
  useTaskAssignRemoveMutation,
} from "../../../queries/tasks"
import { useUser } from "../../../queries/user"
import { User } from "../../../types"
import UserCheckbox from "../../user/UserCheckbox/UserCheckbox"

type UserAssignPickerProps = {
  taskID: number | string
  assignedTo: User[]
  participants: User[]
  owner?: User
  projectID: number | string
}

export default function UserAssignPicker(props: UserAssignPickerProps) {
  const { data: currentUser } = useUser()
  const assign = useTaskAssignMutation(props.projectID, props.taskID)
  const removeAssign = useTaskAssignRemoveMutation(
    props.projectID,
    props.taskID
  )

  function onAssignChange(id: number) {
    if (props.assignedTo.map((user) => user.id).includes(id)) {
      removeAssign.mutate({
        task_id: Number(props.taskID),
        user_id: id,
      })
    } else {
      assign.mutate({
        task_id: Number(props.taskID),
        user_id: id,
      })
    }
  }
  return (
    <Stack spacing={5}>
      {props.owner && (
        <UserCheckbox
          name={`${props.owner.first_name} ${props.owner.last_name}`}
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
          avatar={user.avatar}
          onChange={() => {
            onAssignChange(user.id)
          }}
          checked={props.assignedTo.map((user) => user.id).includes(user.id)}
        />
      ))}
    </Stack>
  )
}
