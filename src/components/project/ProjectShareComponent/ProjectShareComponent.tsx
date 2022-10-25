import { Box, Tabs } from "@mantine/core"
import { Email, Link } from "../../icons"
import ParticipantsList from "./ParticipantsList"
import LinkPanel from "./LinkPanel"
import EmailPanel from "./EmailPanel"
import { User } from "../../../types"

type ProjectShareComponentProps = {
  participants: User[]
  owner: User
}

export default function ProjectShareComponent(
  props: ProjectShareComponentProps
) {
  return (
    <Box>
      <Tabs defaultValue="link">
        <Tabs.List grow>
          <Tabs.Tab icon={<Link size={20} />} value="link">
            Link
          </Tabs.Tab>
          <Tabs.Tab icon={<Email size={20} />} value="email">
            Email
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="email">
          <EmailPanel />
        </Tabs.Panel>
        <Tabs.Panel value="link">
          <LinkPanel />
        </Tabs.Panel>
      </Tabs>
      <ParticipantsList owner={props.owner} participants={props.participants} />
    </Box>
  )
}
