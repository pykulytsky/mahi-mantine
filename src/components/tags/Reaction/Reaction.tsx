import { Badge, Tooltip } from "@mantine/core"
import { useMemo } from "react"
import {
  useReactionAddMutation,
  useReactionRemoveMutation,
} from "../../../queries/tasks"
import { Reaction } from "../../../types"
import { useStyles } from "./Reaction.styles"

interface ReactionTagProps extends Reaction {
  userID: number
  projectID: number
}

export default function ReactionTag(props: ReactionTagProps) {
  const active = useMemo(() => {
    if (props.users.map((user) => user.id).includes(props.userID)) {
      return true
    }
    return false
  }, [props.users, props.userID])
  const { classes, cx } = useStyles(active)
  const add = useReactionAddMutation(props.projectID)
  const remove = useReactionRemoveMutation(props.projectID)
  function onReactionClick() {
    if (active) {
      remove.mutate({
        emoji: props.emoji,
        task_id: props.task_id,
      })
    } else {
      add.mutate({
        emoji: props.emoji,
        task_id: props.task_id,
      })
    }
  }

  const userReactionInfo = props.users.map((user) => (
    <div key={user.id} style={{ textAlign: "center" }}>
      {user.email}
    </div>
  ))

  return (
    <Tooltip label={<>{userReactionInfo}</>}>
      <Badge
        onClick={onReactionClick}
        className={cx(classes.root, { [classes.active]: active })}
        variant="outline"
        leftSection={props.emoji}
      >
        {props.users.length}
      </Badge>
    </Tooltip>
  )
}
