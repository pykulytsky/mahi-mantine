export type User = {
  id: number
  email: string
  first_name?: string
  last_name?: string
  email_verified: boolean
  avatar?: string
  tasks_goal_per_day?: number
}

export type Project = {
    id: number
    name: string
    description?: string
    icon?: string
    accent_color?: string
    is_favorite: boolean
    is_pinned: boolean
    is_editable: boolean
    show_completed_tasks: boolean
    sections: Section[]
    tasks: Task[]
}

export type Section = {
    id: number
    order: number
    name: string
    tasks: Task[]
}

export type Task = {
    id: number
    order: number
    name: string
    description?: string
    is_done: boolean
    deadline?: Date
    done_at?: Date
    color?: string
    is_important: boolean
    remind_at?: Date
    tags: Tag[]
}

export type Tag = {
    id: number
    name: string
    color?: string
}
