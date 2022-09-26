import { useState } from "react"
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  Transition,
  Tooltip,
} from "@mantine/core"
import { Link } from "react-location"
import { TablerIcon, IconChevronLeft, IconChevronRight } from "@tabler/icons"
import { useStyles } from "./Link.styles"

interface LinksGroupProps {
  id?: number
  icon?: TablerIcon
  emoji?: string
  label: string
  color?: string
  opened: boolean
  initiallyOpened?: boolean
  links?: { label: string; link: string; icon?: string }[]
  isLink?: boolean
  to?: string
}

export function LinksGroup({
  id,
  icon: Icon,
  label,
  color,
  initiallyOpened,
  links,
  emoji,
  opened: sidebarOpened,
  to,
}: LinksGroupProps) {
  const { classes, theme } = useStyles()
  const hasLinks = Array.isArray(links)
  const [opened, setOpened] = useState(initiallyOpened || false)
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft
  const items = (hasLinks ? links : []).map((link) => (
    <Text<"a">
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={(event) => event.preventDefault()}
    >
      {link.icon} {link.label}
    </Text>
  ))

  return (
    <>
      <UnstyledButton
        ml={5}
        component={Link}
        to={to}
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Tooltip
          zIndex={9999}
          disabled={sidebarOpened}
          label={label}
          transition="slide-right"
          position="right"
        >
          <Group pr={0} spacing={0}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon color={color} variant="light" size={35}>
                {!emoji ? (
                  // @ts-ignore
                  <Icon size={18} />
                ) : (
                  <Text>{emoji}</Text>
                )}
              </ThemeIcon>
              <Transition
                transition="slide-left"
                mounted={sidebarOpened}
                duration={200}
                timingFunction="ease-in"
              >
                {(styles) => (
                  <Box style={styles} ml="md">
                    {label}
                  </Box>
                )}
              </Transition>
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
        </Tooltip>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}
