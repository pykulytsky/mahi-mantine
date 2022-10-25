import { Box, Container } from "@mantine/core"
import { User } from "../../../types"
import Participant from "./Participant"

type ParticipantsListProps = {
  participants: User[]
  owner: User
}

export default function ParticipantsList(props: ParticipantsListProps) {
  return (
    <Container my="sm" pr={0}>
      <Participant
        avatar={props.owner.avatar}
        email={props.owner.email}
        name={props.owner.first_name + " " + props.owner.last_name}
        isOwner
      />
      {props.participants.map((participant) => (
        <Participant
          key={participant.id}
          avatar={participant.avatar}
          email={participant.email}
          name={participant.first_name + " " + participant.last_name}
        />
      ))}
    </Container>
  )
}
