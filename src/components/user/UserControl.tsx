import { IconSelector } from "@tabler/icons"
import {
  Group,
  Avatar,
  Text,
  UnstyledButton,
  createStyles,
  Loader,
  Stack,
  MediaQuery,
} from "@mantine/core"
import { forwardRef } from "react"
import { useUser } from "../../queries/user"

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
  userMenuOpen: boolean
  setUserMenuOpen: () => void
}

export function UserControlComponent(props: UserButtonProps, ref) {
  const { classes, cx } = useStyles()
  const { data, isLoading, isError } = useUser()

  if (isLoading) return <Loader />
  if (isError) return "Error"
  return (
    <UnstyledButton
      ref={ref}
      onClick={props.setUserMenuOpen}
      className={cx(classes.user, { [classes.userActive]: props.userMenuOpen })}
    >
      <Group spacing={7}>
        <Avatar src={data.avatar} alt={data.first_name} radius="xl" size={20} />
        <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
          {data.first_name} {data.last_name}
        </Text>
        <IconSelector size={12} stroke={1.5} />
      </Group>
    </UnstyledButton>
  )
}

export const UserControl = forwardRef<HTMLButtonElement, UserButtonProps>(
  (props: UserButtonProps, ref) => {
    const { classes, cx } = useStyles()
    const { data, isLoading, isError } = useUser()

    if (isLoading) return <Loader />
    if (isError) return "Error"
    return (
      <UnstyledButton
        p={3}
        ref={ref}
        onClick={props.setUserMenuOpen}
        className={cx(classes.user, {
          [classes.userActive]: props.userMenuOpen,
        })}
      >
        <Group spacing="sm">
          <Avatar src={data.avatar} alt="" radius="xl" size={35} />
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Stack spacing={0}>
              <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                {data.first_name} {data.last_name}
              </Text>

              <Text size="xs" color="dimmed">
                {data.email}
              </Text>
            </Stack>
          </MediaQuery>
          <IconSelector size={12} stroke={1.5} />
        </Group>
      </UnstyledButton>
    )
  }
)
