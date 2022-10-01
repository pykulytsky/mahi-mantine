import { ActionIcon, Loader, Menu, useMantineTheme } from "@mantine/core"
import { Eye, EyeSlash, Menu as MenuIcon } from "../icons"
import { useMatch } from "@tanstack/react-location"
import { useProject } from "../../queries/projects"
import { useProjectMutation } from "../../queries/projects"

export default function ProjectMenu() {
  const {
    params: { projectID: id },
  } = useMatch()
  const { data, isLoading, isError } = useProject(id)
  const { mutate } = useProjectMutation(id)

  if (isLoading) return <Loader />
  if (isError) return <p>Error</p> // TODO add error placeholder
  return (
    <Menu zIndex={99} width={260} position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="transparent">
          <MenuIcon size={25} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {data.show_completed_tasks ? (
          <Menu.Item
            onClick={() => {
              mutate({ id: Number(id), show_completed_tasks: false })
            }}
            icon={<EyeSlash size={15} />}
          >
            Hide completed tasks
          </Menu.Item>
        ) : (
          <Menu.Item
            onClick={() => {
              mutate({ id: Number(id), show_completed_tasks: true })
            }}
            icon={<Eye size={15} />}
          >
            Show completed tasks
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
