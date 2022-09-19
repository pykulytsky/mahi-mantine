import { ActionIcon, Loader, Menu, useMantineTheme } from "@mantine/core"
import { DotsThreeCircle, Eye, EyeSlash } from "phosphor-react"
import { useMatch } from "react-location"
import { useProject } from "../../queries/projects"
import { useProjectMutation } from "../../queries/projects"

export default function ProjectMenu() {
  const {
    params: { projectID: id },
  } = useMatch()
  const theme = useMantineTheme()
  const { data, isLoading, isError } = useProject(id)
  const { mutate } = useProjectMutation(id)
  if (isLoading) return <Loader />
  if (isError) return <p>Error</p> // TODO add error placeholder
  return (
    <Menu width={260} position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="transparent">
          <DotsThreeCircle
            size={25}
            weight="duotone"
            color={theme.colors[theme.primaryColor][3]}
          />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {data.show_completed_tasks ? (
          <Menu.Item
            onClick={() => {
              mutate({ id: Number(id), show_completed_tasks: false })
            }}
            icon={<EyeSlash />}
          >
            Hide completed tasks
          </Menu.Item>
        ) : (
          <Menu.Item
            onClick={() => {
              mutate({ id: Number(id), show_completed_tasks: true })
            }}
            icon={<Eye />}
          >
            Show completed tasks
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
