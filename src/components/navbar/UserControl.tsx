import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Loader,
} from "@mantine/core"
import { IconChevronRight } from "@tabler/icons"
import { useUser } from "../../queries/user"
import { IconSelector } from "@tabler/icons"

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}))

interface UserButtonProps extends UnstyledButtonProps {
  opened: boolean
}

export default function UserControl({ opened, ...others }: UserButtonProps) {
  const { classes } = useStyles()
  const { data, isLoading, isError } = useUser()

  if (isLoading) return <Loader />
  if (isError) return <p>Error</p>
  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <Avatar src={data.avatar} radius="xl" />
        {opened && (
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {data.first_name} {data.last_name}
            </Text>

            <Text color="dimmed" size="xs">
              {data.email}
            </Text>
          </div>
        )}

        <IconSelector size={12} stroke={1.5} />
      </Group>
    </UnstyledButton>
  )
}
