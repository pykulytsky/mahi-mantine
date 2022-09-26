import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme) => ({
  control: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    color:
      theme.colorScheme === "dark"
        ? theme.colors.yellow[4]
        : theme.colors.dark[6],
  },
}))
