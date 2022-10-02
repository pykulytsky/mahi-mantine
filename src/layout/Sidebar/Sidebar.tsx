import { Divider, Center, Box, ActionIcon, Tooltip } from "@mantine/core"
import { useClickOutside, useLocalStorage } from "@mantine/hooks"
import { motion } from "framer-motion"
import {
  Inbox,
  Dashboard,
  Tag,
  Calendar,
  File,
  Project,
  User,
} from "../../components/icons"

import { UserSidebarMenuDropdown } from "../../components/sidebar/UserSidebarMenuDropdown"
// @ts-ignore
import Burger from "@animated-burgers/burger-squeeze"
import "@animated-burgers/burger-squeeze/dist/styles.css"
import SearchInput from "../../components/header/SearchInput"
import { useStyles } from "./Sidebar.styles"
import SidebarLink from "../../components/sidebar/Link/Link"
import { useOwnProjects } from "../../queries/projects"
import { IconPlus } from "@tabler/icons"

export default function Sidebar() {
  const [opened, setOpened] = useLocalStorage({
    key: "sidebar",
    defaultValue: false,
  })
  const ref = useClickOutside(() => {
    if (opened) setOpened(!opened)
  })
  const { data: projects } = useOwnProjects()
  const { classes, theme } = useStyles()

  const builtInLinks = [
    {
      label: "Inbox",
      icon: <Inbox size={25} color={theme.colors.violet[3]} />,
      to: "/app/inbox",
    },
    {
      label: "Dashboard",
      icon: <Dashboard size={25} color={theme.colors.teal[2]} />,
      to: "/app/dashboard",
    },
    {
      label: "Calendar",
      icon: <Calendar size={25} color={theme.colors.yellow[2]} />,
      to: "/app/calendar",
    },
    {
      label: "Shared",
      icon: <User size={25} color={theme.colors.blue[3]} />,
      to: "/app/today",
    },
    {
      label: "Tags",
      icon: <Tag size={25} color={theme.colors.red[3]} />,
      to: "/app/tags",
    },
  ]

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
      ref={ref}
      className={classes.navbar}
      animate={{
        width: opened ? 300 : 68,
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
      <Box
        className={classes.mainSection}
        sx={{
          padding: opened ? "0 6px" : "0 10px",
          transition: ".2s padding linear",
        }}
      >
        {defaultLinks}
        <Divider mb={3} mt={3} />
        {favoriteProjects}
        <SidebarLink
          opened={opened}
          label="All Projects"
          icon={<Project size={20} />}
          to="/app/projects"
          rightSection={
            <Tooltip label="New project">
              <ActionIcon>
                <IconPlus size={15} />
              </ActionIcon>
            </Tooltip>
          }
        />
      </Box>

      <Box className={classes.footer}>
        <SearchInput collapsed={!opened} />
        <UserSidebarMenuDropdown opened={opened} />
      </Box>
    </motion.div>
  )
}
