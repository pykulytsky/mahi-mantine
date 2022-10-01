import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Loader,
} from "@mantine/core"
import { useStyles } from "./UserControl.styles"
import { useUser } from "../../../queries/user"

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
      </Group>
    </UnstyledButton>
  )
}
