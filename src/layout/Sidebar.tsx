import { Navbar, ScrollArea, createStyles, Divider, Title } from "@mantine/core"
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconCalendarEvent,
  IconInbox,
} from "@tabler/icons"
import { Project } from "../types"
import { LinksGroup } from "../components/navbar/LinksGroup"

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
]

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    border: "none",
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingRight: theme.spacing.sm,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}))

interface SidebarProps {
  height: number
  ownProjects?: Project[]
}

export default function Sidebar(props: SidebarProps) {
  const { classes } = useStyles()
  const defaultLinks = builtInLinks.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ))
  const pinnedLinks = props.ownProjects
    ?.filter((project) => project.is_pinned)
    .map((project) => (
      <LinksGroup
        key={project.id}
        label={project.name}
        color={project.accent_color}
        emoji={project.icon}
        id={project.id}
      />
    ))

  return (
    <Navbar
      height={props.height}
      width={{ sm: 300 }}
      p="xl"
      pt={5}
      pr="md"
      className={classes.navbar}
    >
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{defaultLinks}</div>
        <Divider my="sm" label="Pinned" />
        <div className={classes.linksInner}>{pinnedLinks}</div>
        <Divider my="sm" />
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>aaaa</Navbar.Section>
    </Navbar>
  )
}
