import { Group, Loader, Select, Text } from "@mantine/core"
import { forwardRef, ReactNode, useEffect, useMemo, useState } from "react"
import { useOwnProjects, useReorderMutation } from "../../../queries/projects"
import { Task } from "../../../types"
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

type ProjectSelect = {
  project_id: string
  section_id: number | string
  order: number | string
}

export default function ProjectSelect(props: ProjectSelect) {
  const { data: projects, isLoading, isError } = useOwnProjects()
  const [value, setValue] = useState<string>(
    props.section_id
      ? `section-${props.section_id}`
      : props.project_id.toString()
  )

  useEffect(() => {
    setValue(
      props.section_id
        ? `section-${props.section_id}`
        : props.project_id.toString()
    )
  }, [props.project_id, props.section_id])

  const { mutate } = useReorderMutation(props.project_id)

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
    let destinationID: string = props.project_id
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
        sourceID: props.section_id || props.project_id,
        sourceOrder: props.order,
        destinationID,
        sourceType: props.section_id ? "section" : "project",
        destinationType,
        destinationOrder: 0,
      },
      {
        onSuccess: (data) => {
          setValue(
            data.section_id
              ? `section-${data.section_id}`
              : data.project_id.toString()
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
