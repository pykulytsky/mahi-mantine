import { Box, Tabs } from "@mantine/core"
import { Email, Link } from "../../icons"
import ParticipantsList from "./ParticipantsList"
import LinkPanel from "./LinkPanel"

export default function ProjectShareComponent() {
  return (
    <Box>
      <ParticipantsList participants={[]} />
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
          <h1>Email</h1>
        </Tabs.Panel>
        <Tabs.Panel value="link">
          <LinkPanel />
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}
