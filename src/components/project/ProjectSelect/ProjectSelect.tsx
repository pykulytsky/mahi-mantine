import { Group, Loader, Select, Text } from "@mantine/core"
import { forwardRef, ReactNode, useEffect, useMemo, useState } from "react"
import { AsideTask } from "../../../layout/LayoutProvider"
import { useOwnProjects, useReorderMutation } from "../../../queries/projects"
import { Project } from "../../icons"

export type SelectItemProps = {
  icon?: string | ReactNode
  value: string
  label: string
  isSection: boolean
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ icon, label, isSection, ...others }: SelectItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group spacing="xs" noWrap pl={isSection ? "md" : 0}>
        {icon}
        <Text size="sm">{label}</Text>
      </Group>
    </div>
  )
)

export default function ProjectSelect(props: AsideTask) {
  const { data: projects, isLoading, isError } = useOwnProjects()
  const [value, setValue] = useState<string>(
    props.project_id
      ? props.project_id.toString()
      : `section-${props.section_id}`
  )

  useEffect(() => {
    setValue(
      props.project_id
        ? props.project_id.toString()
        : `section-${props.section_id}`
    )
  }, [props])

  const { mutate } = useReorderMutation(props.projectID.toString())

  const data = useMemo<SelectItemProps[]>(() => {
    let res: SelectItemProps[] = []
    projects?.forEach((project) => {
      res.push({
        value: project.id.toString(),
        label: project.name,
        icon: project.icon,
        isSection: false,
      })
      project.sections.forEach((section) => {
        res.push({
          value: `section-${section.id}`,
          label: section.name,
          isSection: true,
        })
      })
    })
    return res
  }, [projects])

  function handleProjectChange(value: string) {
    const tokens: string[] = value.split("-")
    let destinationID: string = props.project_id || props.projectID
    let destinationType: string = "project"
    if (tokens.length == 1) {
      // project
      destinationID = tokens[0]
    } else if (tokens.length == 2) {
      destinationID = tokens[1]
      destinationType = "section"
    }
    mutate(
      {
        sourceID: props.project_id || props.section_id,
        sourceOrder: props.order,
        destinationID,
        sourceType: props.section_id ? "section" : "project",
        destinationType,
        destinationOrder: 0,
      },
      {
        onSuccess: (data) => {
          setValue(
            data.project_id
              ? data.project_id.toString()
              : `section-${data.section_id}`
          )
        },
      }
    )
  }

  if (isLoading) return <Loader size="xs" />
  if (isError) return <span>error</span>
  return (
    <Select
      size="xs"
      searchable
      itemComponent={SelectItem}
      icon={<Project size={15} />}
      placeholder="Select project"
      value={value}
      data={data}
      onChange={handleProjectChange}
    />
  )
}
