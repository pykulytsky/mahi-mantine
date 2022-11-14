import { Group, Center, Avatar, Text, Anchor } from "@mantine/core"
import { Link } from "@tanstack/react-location"
import { User } from "../../icons"

type FooterProps = {
  ownerId: number
  ownerAvatar?: string
  ownerName: string
  lastModified?: Date
}

export default function Footer({
  ownerId,
  ownerName,
  ownerAvatar,
  lastModified,
}: FooterProps) {
  return (
    <Group position="apart" my="sm" noWrap>
      <Center inline>
        <Avatar size="xs" src={ownerAvatar}>
          <User size={15} />
        </Avatar>
        <Text ml={3} size="xs">
          Created by{" "}
          <Anchor component={Link} to={`/app/profiles/${ownerId}`}>
            {ownerName}
          </Anchor>
        </Text>
      </Center>
      {lastModified && (
        <Text align="right" size="xs">
          Last modified {lastModified.toDateString()}
        </Text>
      )}
    </Group>
  )
}
