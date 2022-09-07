import http from "./axios";
import { Project } from "../sharedTypes";

const BASE_URL: string = "/projects/"

export const fetchUserProjects = async () => {
    const { data } = await http.get<Project[]>(BASE_URL + "/user/")

    return data
}

export const fetchProject = async (ID: string | undefined) => {
    const { data } = await http.get<Project>(BASE_URL + ID)

    return data
}
