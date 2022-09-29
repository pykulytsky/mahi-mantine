import { ActionIcon, Loader, Menu, useMantineTheme } from "@mantine/core"
import { openModal } from "@mantine/modals"
import { IconLayout2 } from "@tabler/icons"
import { DotsThreeCircle, Eye, EyeSlash } from "phosphor-react"
import { useMatch } from "@tanstack/react-location"
import { useProject } from "../../queries/projects"
import { useProjectMutation } from "../../queries/projects"
import DisplaySelect from "./projectEditForms/DisplaySelect"
import { Menu as MenuIcon } from "../icons"

export default function ProjectMenu() {
  const {
    params: { projectID: id },
  } = useMatch()
  const theme = useMantineTheme()
  const { data, isLoading, isError } = useProject(id)
  const { mutate } = useProjectMutation(id)

  function onEditViewSelect() {
    openModal({
      title: "Select project view",
      children: <DisplaySelect />,
    })
  }

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
        <Menu.Item onClick={onEditViewSelect} icon={<IconLayout2 size={15} />}>
          Display settings
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
