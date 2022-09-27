import { useMantineTheme } from "@mantine/core"

export default function useColor(defaultColor?: string): string {
  if (defaultColor) return defaultColor
  else {
    const theme = useMantineTheme()
    return theme.colorScheme === "dark" ? theme.white : theme.black
  }
}
