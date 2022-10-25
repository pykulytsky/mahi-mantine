import type { MutableRefObject } from "react"
import type { UniqueIdentifier } from "@dnd-kit/core"
import type { Task, Section } from "../../types"

export interface TreeItem {
  id: UniqueIdentifier
  children: TreeItem[]
  collapsed?: boolean
  isTask?: boolean
  task?: Task
  section?: Section
  isSection?: boolean
  name: string
}

export type TreeItems = TreeItem[]

export interface FlattenedItem extends TreeItem {
  parentId: UniqueIdentifier | null
  depth: number
  index: number
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[]
  offset: number
}>
