import http from "./axios";

type Project = {
    id: number
    name: string
    description?: string
    icon?: string
    accent_color?: string
    is_favorite: boolean
    is_pinned: boolean
    is_editable: boolean
    show_completed_tasks: boolean
}

const BASE_URL: string = "/projects/"


export const fetchUserProjects = async () => {
    const { data } = await http.get<Project>("/user/")

    return data
}
