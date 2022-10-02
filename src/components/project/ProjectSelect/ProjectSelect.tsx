import { Loader, Select } from "@mantine/core"
import { useMemo } from "react"
import { useOwnProjects } from "../../../queries/projects"

export type SectionItemType = {
  id: string
  name: string
}

export default function ProjectSelect() {
  const { data: projects, isLoading, isError } = useOwnProjects()

  const data = useMemo(() => {
    let res: SectionItemType[] = []
    projects?.forEach((project) => {
      res.push({
        id: project.id.toString(),
        name: project.name,
      })
      project.sections.forEach((section) => {
        res.push({
          id: `${project.id} ${section.id}`,
          name: section.name,
        })
      })
    })
  }, [])

  if (isLoading) return <Loader size="xs" />
  if (isError) return <span>error</span>
  return <Select placeholder="Select project" />
}
