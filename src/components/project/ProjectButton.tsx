import { ActionIcon, Title, useMantineTheme } from "@mantine/core"
import { forwardRef } from "react"
import { File } from "../icons"

type ProjectButtonProps = {
  loading?: boolean
  icon?: string
  color?: string
  size?: number
  variant?: "filled" | "light"
}

export const ProjectButton = forwardRef<HTMLDivElement, ProjectButtonProps>(
  (
    { loading, icon, color, size, variant, ...others }: ProjectButtonProps,
    ref
  ) => {
    const theme = useMantineTheme()
    return (
      <div ref={ref} {...others}>
        <ActionIcon
          loading={loading}
          variant={variant || "light"}
          size={size || 55}
          radius="lg"
          color={color || theme.primaryColor}
        >
          {icon ? (
            <Title order={2}>{icon}</Title>
          ) : (
            <File
              size={30}
              color={color || theme.colors[theme.primaryColor][2]}
            />
          )}
        </ActionIcon>
      </div>
    )
  }
)
