import {
  UnstyledButton,
  Group,
  ThemeIcon,
  Collapse,
  Box,
  Text,
} from "@mantine/core"
import {
  TablerIcon,
  IconChevronRight,
  IconChevronLeft,
  IconCalendarStats,
} from "@tabler/icons"
import { useState } from "react"
import { Link, useResolvePath } from "react-location"
import { useStyles } from "./LinksGroup.styles"

interface LinksGroupProps {
  icon: TablerIcon
  label: string
  initiallyOpened?: boolean
  links?: { label: string; link: string }[]
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
}: LinksGroupProps) {
  const { classes, theme, cx } = useStyles()
  const resolvePath = useResolvePath()
  const currentPath = resolvePath(".")
  const hasLinks = Array.isArray(links)
  const [opened, setOpened] = useState(initiallyOpened || false)
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft
  const items = (hasLinks ? links : []).map((link) => (
    <Text
      component={Link}
      className={cx(classes.link, {
        [classes.activeLink]: window.location.pathname === link.link,
      })}
      to={link.link}
      key={link.label}
    >
      {link.label}
    </Text>
  ))

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                  : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}

const mockdata = {
  label: "Releases",
  icon: IconCalendarStats,
  links: [
    { label: "Upcoming releases", link: "/app/projects/1" },
    { label: "Previous releases", link: "/" },
    { label: "Releases schedule", link: "/" },
  ],
}

export function NavbarLinksGroup() {
  return (
    <Box
      sx={(theme) => ({
        minHeight: 220,
        padding: 5,
        borderRadius: theme.radius.md,
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      })}
    >
      <LinksGroup {...mockdata} />
    </Box>
  )
}
