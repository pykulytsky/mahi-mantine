import { ProjectContextProvider } from "../store/project"
import Project from "./Project"

export default function ProjectRoot() {
  return (
    <ProjectContextProvider>
      <Project />
    </ProjectContextProvider>
  )
}
