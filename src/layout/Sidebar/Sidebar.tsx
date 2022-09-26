import { Divider, Center, Box } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import {
  IconCalendarStats,
  IconGauge,
  IconCalendarEvent,
  IconInbox,
  IconTags,
} from "@tabler/icons"
import { motion } from "framer-motion"

import { UserSidebarMenuDropdown } from "../../components/sidebar/UserSidebarMenuDropdown"
// @ts-ignore
import Burger from "@animated-burgers/burger-squeeze"
import "@animated-burgers/burger-squeeze/dist/styles.css"
import SearchInput from "../../components/header/SearchInput"
import { useStyles } from "./Sidebar.styles"
import { ProjectorScreen } from "phosphor-react"
import SidebarLink from "../../components/sidebar/Link/Link"
import { useOwnProjects } from "../../queries/projects"

const builtInLinks = [
  {
    label: "Inbox",
    icon: <IconInbox size={20} />,
    color: "violet",
    to: "/app/inbox",
  },
  { label: "Dashboard", icon: <IconGauge size={20} />, to: "/app/dashboard" },
  {
    label: "Calendar",
    icon: <IconCalendarEvent size={20} />,
    color: "green",
    to: "/app/calendar",
  },
  {
    label: "Today",
    icon: <IconCalendarStats size={20} />,
    color: "yellow",
    to: "/app/today",
  },
  {
    label: "Tags",
    icon: <IconTags size={20} />,
    color: "teal",
    to: "/app/tags",
  },
]

export default function Sidebar() {
  const [opened, setOpened] = useLocalStorage({
    key: "sidebar",
    defaultValue: false,
  })
  const { data: projects } = useOwnProjects()
  const { classes } = useStyles()
  const defaultLinks = builtInLinks.map((item) => (
    <SidebarLink opened={opened} {...item} key={item.label} />
  ))

  const favoriteProjects = projects
    ?.filter((project) => project.is_favorite)
    .map((project) => (
      <SidebarLink
        key={project.id}
        opened={opened}
        label={project.name}
        icon={project.icon}
        to={"/app/projects/" + project.id}
        color={project.accent_color}
      />
    ))

  return (
    <motion.div
      className={classes.navbar}
      animate={{
        width: opened ? 300 : 70,
      }}
    >
      <Center className={classes.header}>
        <Burger
          style={{
            fontSize: 8,
          }}
          isOpen={opened}
          onClick={() => {
            setOpened(!opened)
          }}
        />
      </Center>
      <Box className={classes.mainSection}>
        {defaultLinks}
        <Divider mb={3} mt={3} />
        {favoriteProjects}
      </Box>

      <Box className={classes.footer}>
        <SearchInput collapsed={!opened} />
        <UserSidebarMenuDropdown opened={opened} />
      </Box>
    </motion.div>
  )
}
