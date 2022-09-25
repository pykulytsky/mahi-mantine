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

const builtInLinks = [
  { label: "Inbox", icon: IconInbox, color: "violet" },
  { label: "Dashboard", icon: IconGauge },
  {
    label: "Calendar",
    icon: IconCalendarEvent,
    color: "green",
  },
  {
    label: "Today",
    icon: IconCalendarStats,
    color: "yellow",
  },
  {
    label: "Tags",
    icon: IconTags,
    color: "teal",
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
  const theme = useMantineTheme()
  const defaultLinks = builtInLinks.map((item) => (
    <LinksGroup opened={opened} {...item} key={item.label} />
  ))
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
      </Box>

      <Box className={classes.footer}>
        <SearchInput collapsed={!opened} />
        <UserSidebarMenuDropdown opened={opened} />
      </Box>
    </motion.div>
  )
}
