import { Text } from "@mantine/core"


interface SectionHeaderProps {
  name: string
  onOpen: () => void
}

export default function SectionHeader(props: SectionHeaderProps) {
  return (
    <Text
      onClick={props.onOpen}
      sx={{
        cursor: 'pointer'
      }}
      weight={700}
    >
      {props.name}
    </Text>
  )
}
