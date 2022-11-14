import { useEffect } from "react"
import { useStoreSetter } from "../store/project"

type Members = {
  members: number[]
}

export default function useProjectSSE(ID: number | string) {
  const setProject = useStoreSetter()
  const token = localStorage.getItem("access_token")
  if (!token) throw new Error("Unauthorized user")

  const URL = `http://localhost:8000/sse/project/${ID}/${token}`

  function onMembersStatusUpdate(event: any) {
    const data = JSON.parse(event.data.replaceAll("'", '"'))
    data.members = JSON.parse(data.members)
    const members: Members = data
    setProject({ members: members.members })
  }

  useEffect(() => {
    const channel = new EventSource(URL, {
      withCredentials: false,
    })
    channel.addEventListener("members_status_update", onMembersStatusUpdate)
    return () => channel.close()
  }, [])
}
