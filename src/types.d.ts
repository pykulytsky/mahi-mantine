export declare type User = {
  id: number
  email: string
  first_name?: string
  last_name?: string
  email_verified: boolean
  avatar?: string
  tasks_goal_per_day?: number
}

export declare type Project = {
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

export declare type ProjectEdit = {
  id?: number
  name?: string
  description?: string
  icon?: string
  accent_color?: string
  is_favorite?: boolean
  is_pinned?: boolean
  is_editable?: boolean
  show_completed_tasks?: boolean
}

export declare type Section = {
  id: number
  order: number
  name: string
  tasks: Task[]
}

export declare interface Task {
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

export declare type TaskEdit = {
  id: number
  name?: string
  description?: string | null
  is_done?: boolean
  deadline?: Date | number | string | null
  done_at?: Date | null
  color?: string | null
  is_important?: boolean
  remind_at?: Date | null
}

export declare type TaskReorder = {
  sourceID: string | number
  sourceOrder: string | number
  destinationID: string | number
  sourceType: string
  destinationType: string
  destinationOrder: string | number
}

export declare type Tag = {
  id: number
  name: string
  color?: string
}

export declare type CreateTaskFormType = {
  name: string
  description?: string
  project_id?: number | string
  section_id?: number | string
  tags: Tag[]
}

export declare interface TagItemCreate {
  task_id: number
  tag_id: number
}

export declare interface TagItem extends TagItemCreate {
  id: number
}

export declare interface SectionCreate {
  name: string
  project_id: number
  order?: number
}
