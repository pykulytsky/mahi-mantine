import { Divider, Center, Box, ActionIcon, Tooltip } from "@mantine/core"
import { useClickOutside, useLocalStorage } from "@mantine/hooks"
import { motion } from "framer-motion"
import {
  Inbox,
  Dashboard,
  Tag,
  Calendar,
  Project as ProjectIcon,
  User,
  Plus,
} from "../../components/icons"

import { UserSidebarMenuDropdown } from "../../components/sidebar/UserSidebarMenuDropdown"
// @ts-ignore
import Burger from "@animated-burgers/burger-squeeze"
import "@animated-burgers/burger-squeeze/dist/styles.css"
import SearchInput from "../../components/header/SearchInput"
import { useStyles } from "./Sidebar.styles"
import SidebarLink from "../../components/sidebar/Link/Link"
import {
  useOwnProjects,
  useProjectCreateMutation,
} from "../../queries/projects"
import { openModal } from "@mantine/modals"
import ProjectCreateForm from "../../components/project/ProjectCreateForm/ProjectCreateForm"
import { useNavigate } from "@tanstack/react-location"
import { ProjectCreate, Project } from "../../types"
import { closeAllModals } from "@mantine/modals"
import { showNotification } from "@mantine/notifications"
import { memo } from "react"

export default memo(function Sidebar() {
  const { mutate } = useProjectCreateMutation()
  const navigate = useNavigate()
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

  function onProjectCreate(e: any) {
    e.preventDefault()
    openModal({
      title: "Create new project",
      children: <ProjectCreateForm onSubmit={onProjectCreateConfirm} />,
      radius: "lg",
    })
  }

  function onProjectCreateConfirm(project: ProjectCreate) {
    mutate(
      {
        name: project.name || "Untitled project",
        accent_color: project.accent_color,
        icon: project.icon,
        is_favorite: project.is_favorite,
      },
      {
        onSuccess: (data: Project) => {
          closeAllModals()
          navigate({ to: `/app/projects/${data.id}` })
          showNotification({
            message: `New project ${data.name} was created`,
            icon: <ProjectIcon size={20} />,
          })
        },
      }
    )
  }

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
          transition: ".2s padding ease-out",
        }}
      >
        {defaultLinks}
        <Divider mb={3} mt={3} />
        {favoriteProjects}
        <SidebarLink
          opened={opened}
          label="All Projects"
          icon={<ProjectIcon size={25} />}
          to="/app/projects"
          rightSection={
            <Tooltip label="New project">
              <ActionIcon onClick={onProjectCreate}>
                <Plus size={15} />
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
})
