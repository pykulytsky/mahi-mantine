import { Section, SectionCreate } from "../types"
import http from "./axios"

const BASE_URL = "/sections/"

export const addSection = async (section: SectionCreate): Promise<Section> => {
  const { data } = await http.post<Section>(BASE_URL, {
    ...section
  })

  return data
}
