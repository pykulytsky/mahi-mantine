import { Divider, Center, useMantineTheme, Box } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import {
  IconCalendarStats,
  IconGauge,
  IconCalendarEvent,
  IconInbox,
  IconTags,
} from "@tabler/icons"
import { motion } from "framer-motion"

import { Project } from "../../types"
import { LinksGroup } from "../../components/sidebar/Link/Link"
import { UserSidebarMenuDropdown } from "../../components/sidebar/UserSidebarMenuDropdown"
// @ts-ignore
import Burger from "@animated-burgers/burger-squeeze"
import "@animated-burgers/burger-squeeze/dist/styles.css"
import SearchInput from "../../components/header/SearchInput"
import { useStyles } from "./Sidebar.styles"
import { ProjectorScreen } from "phosphor-react"
import { NavbarLinksGroup } from "../../components/sidebar/LinksGroup/LinksGroup"

const builtInLinks = [
  { label: "Inbox", icon: IconInbox, color: "violet", to: "/app/inbox" },
  { label: "Dashboard", icon: IconGauge, to: "/app/dashboard" },
  {
    label: "Calendar",
    icon: IconCalendarEvent,
    color: "green",
    to: "/app/calendar",
  },
  {
    label: "Today",
    icon: IconCalendarStats,
    color: "yellow",
    to: "/app/today",
  },
  {
    label: "Tags",
    icon: IconTags,
    color: "teal",
    to: "/app/tags",
  },
]

interface SidebarProps {
  ownProjects?: Project[]
}

export default function Sidebar(props: SidebarProps) {
  const [opened, setOpened] = useLocalStorage({
    key: "sidebar",
    defaultValue: false,
  })
  const { classes } = useStyles()
  const defaultLinks = builtInLinks.map((item) => (
    <LinksGroup opened={opened} {...item} key={item.label} />
  ))
  const projectsList = {
    label: "Projects",
    icon: ProjectorScreen,
    links: props.ownProjects?.map((project) => ({
      label: project.name,
      link: "/app/projects/" + project.id,
      icon: project.icon,
    })),
  }
  const allProjects = <LinksGroup opened={opened} {...projectsList} key={999} />
  const pinnedLinks = props.ownProjects
    ?.filter((project) => project.is_favorite)
    .map((project) => (
      <LinksGroup
        opened={opened}
        key={project.id}
        label={project.name}
        color={project.accent_color}
        emoji={project.icon}
        id={project.id}
        to={`/app/projects/${project.id}`}
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
        <div className={classes.linksInner}>{defaultLinks}</div>
        <Divider my="xs" />
        <div className={classes.linksInner}>{pinnedLinks}</div>
        <Divider my="xs" />
        {allProjects}
        <NavbarLinksGroup />
      </Box>

      <Box className={classes.footer}>
        <SearchInput collapsed={!opened} />
        <UserSidebarMenuDropdown opened={opened} />
      </Box>
    </motion.div>
  )
}
