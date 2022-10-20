import { Box } from "@mantine/core"
import { User } from "../../../types"
import Participant from "./Participant"

type ParticipantsListProps = {
  participants: User[]
}

export default function ParticipantsList(props: ParticipantsListProps) {
  return (
    <Box>
      {props.participants.map((participant) => (
        <Participant
          avatar={participant.avatar}
          name={participant.first_name + "" + participant.last_name}
        />
      ))}
    </Box>
  )
}
