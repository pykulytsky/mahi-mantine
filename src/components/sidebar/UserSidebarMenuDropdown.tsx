import { forwardRef } from "react"
import {
  Group,
  Avatar,
  Text,
  Menu,
  UnstyledButton,
  Loader,
  Transition,
  ActionIcon,
  Center,
} from "@mantine/core"
import { useUser } from "../../queries/user"
import { UserMenuDropdown } from "../user"
import { Config } from "../icons"

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image?: string
  name: string
  email: string
  icon?: React.ReactNode
  opened: boolean
}

export const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, opened, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: 15,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />
        {opened && (
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {name}
            </Text>

            <Text color="dimmed" size="xs">
              {email}
            </Text>
          </div>
        )}
      </Group>
    </UnstyledButton>
  )
)

type UserMenuDropDownProps = {
  opened: boolean
}

export function UserSidebarMenuDropdown(props: UserMenuDropDownProps) {
  const { data, isLoading, isError } = useUser()

  if (isLoading) return <Loader />
  if (isError) return <p>Error</p>
  return (
    <Menu withArrow width={260}>
      <Menu.Target>
        <Center mb={3}>
          <ActionIcon size="xl">
            <Config size={28} />
          </ActionIcon>
        </Center>
      </Menu.Target>
      <UserMenuDropdown />
    </Menu>
  )
}
