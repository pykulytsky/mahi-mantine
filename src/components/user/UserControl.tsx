import { IconSelector } from "@tabler/icons"
import {
  Group,
  Avatar,
  Text,
  UnstyledButton,
  createStyles,
} from "@mantine/core"
import { forwardRef } from "react"

const useStyles = createStyles((theme) => ({
  user: {
    color: theme.colors.dark[0],
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.md,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme == "dark" ? theme.colors.dark[5] : "none",
    },
  },
  userActive: {
    backgroundColor:
      theme.colorScheme == "dark" ? theme.colors.dark[5] : "none",
  },
}))

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string
  name: string
  email: string
  icon?: React.ReactNode
  userMenuOpen: boolean
  setUserMenuOpen: () => void
}

export function UserControlComponent(props: UserButtonProps, ref) {
  const { classes, cx } = useStyles()
  return (
    <UnstyledButton
      ref={ref}
      onClick={props.setUserMenuOpen}
      className={cx(classes.user, { [classes.userActive]: props.userMenuOpen })}
    >
      <Group spacing={7}>
        <Avatar src={props.image} alt={props.name} radius="xl" size={20} />
        <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
          {props.name}
        </Text>
        <IconSelector size={12} stroke={1.5} />
      </Group>
    </UnstyledButton>
  )
}

export const UserControl = forwardRef<HTMLButtonElement, UserButtonProps>(
  (props: UserButtonProps, ref) => {
    const { classes, cx } = useStyles()
    return (
      <UnstyledButton
        ref={ref}
        onClick={props.setUserMenuOpen}
        className={cx(classes.user, {
          [classes.userActive]: props.userMenuOpen,
        })}
      >
        <Group spacing={7}>
          <Avatar src={props.image} alt={props.name} radius="xl" size={20} />
          <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
            {props.name}
          </Text>
          <IconSelector size={12} stroke={1.5} />
        </Group>
      </UnstyledButton>
    )
  }
)
