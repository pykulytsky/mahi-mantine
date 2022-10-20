export declare type User = {
  id: number
  email: string
  first_name?: string
  last_name?: string
  email_verified: boolean
  avatar?: string
  tasks_goal_per_day?: number
}

export declare interface ProjectCreate {
  name?: string
  description?: string
  icon?: string
  accent_color?: string
  is_favorite?: boolean
}

export declare interface Project extends ProjectCreate {
  id: number
  name: string
  is_favorite: boolean
  is_pinned: boolean
  is_editable: boolean
  show_completed_tasks: boolean
  participants: User[]
  sections: Section[]
  tasks: Task[]
  owner: User
}

export declare interface ProjectEdit extends ProjectCreate {
  id?: number
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

export interface ReactionCreate {
  task_id: number
  emoji: string
}

export interface Reaction extends ReactionCreate {
  id: number
  users: User[]
}

export declare interface Task {
  id: number
  order: number
  name: string
  description?: string
  is_completed: boolean
  deadline?: Date | null
  done_at?: Date
  created?: Date
  updated?: Date
  is_important: boolean
  remind_at?: Date
  tags: Tag[]
  reactions: Reaction[]
  owner?: User
  project_id?: int
  section_id?: int
  assigned_to: User[]
}

export declare type TaskEdit = {
  id?: number | string
  name?: string
  description?: string | null
  is_completed?: boolean
  deadline?: Date | number | string | null
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

export declare interface TagCreate {
  name: string
  color?: string
}

export declare interface Tag extends TagCreate {
  id: number
}

export declare type CreateTaskFormType = {
  name: string
  description?: string
  project_id?: number | string
  section_id?: number | string
  owner_id?: number | string
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

export declare interface Assignee {
  task_id: number
  user_id: number
}
