import {
  Navbar,
  ScrollArea,
  createStyles,
  Divider,
  Center,
  useMantineTheme,
} from "@mantine/core"
import {
  IconCalendarStats,
  IconGauge,
  IconCalendarEvent,
  IconInbox,
  IconTags,
} from "@tabler/icons"
import { Project } from "../types"
import { LinksGroup } from "../components/navbar/LinksGroup"
import { useLocalStorage } from "@mantine/hooks"
import { motion } from "framer-motion"
import Burger from "@animated-burgers/burger-squeeze"
import "@animated-burgers/burger-squeeze/dist/styles.css"

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

const useStyles = createStyles((theme) => ({
  navbar: {
    height: "100vh",
    position: "sticky",
    top: 0,
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
      <Center mt="sm" mb="sm">
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
      <div className={classes.linksInner}>{defaultLinks}</div>
      <Divider my="sm" />
      <div className={classes.linksInner}>{pinnedLinks}</div>
      <Divider my="sm" />
      {/* <Navbar
        height={props.height}
        width={{ sm: opened ? 300 : 75 }}
        p="xl"
        pt={5}
        pr="md"
        className={classes.navbar}
      >
        <Burger
          opened={opened}
          onClick={() => {
            setOpened(!opened)
          }}
          size="sm"
          mr="xl"
        />
        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{defaultLinks}</div>
          <Divider my="sm" label="Favorite" />
          <div className={classes.linksInner}>{pinnedLinks}</div>
          <Divider my="sm" />
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>aaaa</Navbar.Section>
      </Navbar> */}
    </motion.div>
  )
}
