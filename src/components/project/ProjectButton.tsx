import { ActionIcon, Title, useMantineTheme } from "@mantine/core"
import { forwardRef } from "react"
import { File } from "../icons"

type ProjectButtonProps = {
  loading?: boolean
  icon?: string
}


export const ProjectButton = forwardRef<HTMLDivElement, ProjectButtonProps>(
  ({ loading, icon, ...others }: ProjectButtonProps, ref) => {
    const theme = useMantineTheme()
    return (
      <div ref={ref} {...others}>
        <ActionIcon
          loading={loading}
          variant="light"
          size={55}
          radius="lg"
          color={theme.colors[theme.primaryColor][5]}
        >
          {icon ? (
            <Title order={2}>{icon}</Title>
          ) : (
            <File size={30} color={theme.colors[theme.primaryColor][2]} />
          )}
        </ActionIcon>
      </div>
    )
  }
)
