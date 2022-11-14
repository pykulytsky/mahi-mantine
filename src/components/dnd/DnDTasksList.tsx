import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Reorder } from "../../types"
import {
  Announcements,
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
  DragMoveEvent,
  DragEndEvent,
  DragOverEvent,
  MeasuringStrategy,
  DropAnimation,
  Modifier,
  defaultDropAnimation,
  UniqueIdentifier,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import {
  buildTree,
  flattenTree,
  getProjection,
  getChildCount,
  removeItem,
  removeChildrenOf,
  setProperty,
} from "./utilities"
import type {
  FlattenedItem,
  SensorContext,
  TreeItems,
  TreeItem as TreeItemType,
} from "./types"
import { sortableTreeKeyboardCoordinates } from "./keyboardCoordinates"
import { SortableTreeItem } from "../dnd"
import { CSS } from "@dnd-kit/utilities"
import { reorderTask } from "../../api/tasks.api"

const initialItems: TreeItems = []

const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
}

const dropAnimationConfig: DropAnimation = {
  keyframes({ transform }) {
    return [
      { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
      {
        opacity: 0,
        transform: CSS.Transform.toString({
          ...transform.final,
          x: transform.final.x + 5,
          y: transform.final.y + 5,
        }),
      },
    ]
  },
  easing: "ease-out",
  sideEffects({ active }) {
    active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: defaultDropAnimation.duration,
      easing: defaultDropAnimation.easing,
    })
  },
}

interface Props {
  collapsible?: boolean
  defaultItems?: TreeItems
  indentationWidth?: number
  indicator?: boolean
  removable?: boolean
}

export function SortableTree({
  collapsible,
  defaultItems = initialItems,
  indicator = false,
  indentationWidth = 30,
  removable,
}: Props) {
  const queryClient = useQueryClient()
  const [items, setItems] = useState(() => defaultItems)
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null)
  const [offsetLeft, setOffsetLeft] = useState(0)
  const [currentPosition, setCurrentPosition] = useState<{
    parentId: UniqueIdentifier | null
    overId: UniqueIdentifier
  } | null>(null)
  const { mutate } = useMutation(reorderTask)
  const hash = document.location.hash

  useEffect(() => {
    setItems(defaultItems)
  }, [defaultItems])

  useEffect(() => {
    if (hash) {
      const task = document.querySelector(hash)
      if (task) {
        // @ts-ignore
        task.focus()
        task.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [])

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items)
    const collapsedItems = flattenedTree.reduce<string[]>(
      (acc, { children, collapsed, id }) =>
        // @ts-ignore
        collapsed && children.length ? [...acc, id] : acc,
      []
    )
    return removeChildrenOf(
      flattenedTree,
      // @ts-ignore
      activeId ? [activeId, ...collapsedItems] : collapsedItems
    )
  }, [activeId, items])
  const projected =
    activeId && overId
      ? getProjection(
          flattenedItems,
          activeId,
          overId,
          offsetLeft,
          indentationWidth
        )
      : null
  const sensorContext: SensorContext = useRef({
    items: flattenedItems,
    offset: offsetLeft,
  })
  const [coordinateGetter] = useState(() =>
    sortableTreeKeyboardCoordinates(sensorContext, indicator, indentationWidth)
  )
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    })
  )

  const sortedIds = useMemo(
    () => flattenedItems.map(({ id }) => id),
    [flattenedItems]
  )
  const activeItem = activeId
    ? flattenedItems.find(({ id }) => id === activeId)
    : null

  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft,
    }
  }, [flattenedItems, offsetLeft])

  const announcements: Announcements = {
    onDragStart({ active }) {
      return `Picked up ${active.id}.`
    },
    onDragMove({ active, over }) {
      return getMovementAnnouncement("onDragMove", active.id, over?.id)
    },
    onDragOver({ active, over }) {
      return getMovementAnnouncement("onDragOver", active.id, over?.id)
    },
    onDragEnd({ active, over }) {
      return getMovementAnnouncement("onDragEnd", active.id, over?.id)
    },
    onDragCancel({ active }) {
      return `Moving was cancelled. ${active.id} was dropped in its original position.`
    },
  }

  return (
    <DndContext
      accessibility={{ announcements }}
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={measuring}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map(
          ({ id, children, collapsed, depth, name, task }) => (
            <SortableTreeItem
              key={id}
              id={id}
              // @ts-ignore
              value={id}
              name={name}
              task={task}
              depth={id === activeId && projected ? projected.depth : depth}
              indentationWidth={indentationWidth}
              indicator={indicator}
              collapsed={Boolean(collapsed && children.length)}
              onCollapse={
                collapsible && children.length
                  ? () => handleCollapse(id)
                  : undefined
              }
              onRemove={removable ? () => handleRemove(id) : undefined}
            />
          )
        )}
        {createPortal(
          <DragOverlay
            dropAnimation={dropAnimationConfig}
            modifiers={indicator ? [adjustTranslate] : undefined}
          >
            {activeId && activeItem ? (
              <SortableTreeItem
                id={activeId}
                depth={activeItem.depth}
                name="test"
                task={activeItem.task}
                clone
                childCount={getChildCount(items, activeId) + 1}
                value={activeId.toString()}
                indentationWidth={indentationWidth}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </SortableContext>
    </DndContext>
  )

  function handleDragStart({ active: { id: activeId } }: DragStartEvent) {
    setActiveId(activeId)
    setOverId(activeId)

    const activeItem = flattenedItems.find(({ id }) => id === activeId)

    if (activeItem) {
      setCurrentPosition({
        parentId: activeItem.parentId,
        overId: activeId,
      })
    }

    document.body.style.setProperty("cursor", "grabbing")
  }

  function handleDragMove({ delta }: DragMoveEvent) {
    setOffsetLeft(delta.x)
  }

  function handleDragOver({ over }: DragOverEvent) {
    setOverId(over?.id ?? null)
  }

  function fintPreviousSibling(item: TreeItemType, items: TreeItems) {
    let previousSibling: number = -1
    for (const parent of items) {
      if (item.id === parent.id) {
        previousSibling = items.indexOf(parent)
        break
      }
      if (parent.children) {
        for (const subparent of parent.children) {
          if (item.id === subparent.id) {
            previousSibling = parent.children.indexOf(subparent)
            break
          }
        }
      }
    }
    return previousSibling
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    resetState()
    if (projected && over) {
      const { depth, parentId } = projected
      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(items))
      )
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id)
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id)
      const activeTreeItem = clonedItems[activeIndex]

      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId }

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex)
      const newItems = buildTree(sortedItems)

      setItems(newItems)

      const taskID = activeTreeItem.id.toString().split("_")[1]
      const siblingOrder = fintPreviousSibling(activeTreeItem, newItems)

      const newClonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(newItems))
      )
      const newActiveIndex = newClonedItems.findIndex(
        ({ id }) => id === active.id
      )
      const newActiveTreeItem = newClonedItems[newActiveIndex]

      const parentTaskID = newActiveTreeItem?.parentId?.toString().split("_")[1]
      const data: Reorder = {
        id: Number(taskID),
        container_id: Number(parentTaskID) || 1,
        // parent === "root" ? 1 : Number(parent?.toString().split("_")[1]),
        // @ts-ignore
        container_type: parentTaskID ? "task" : "root",
        //parent === "root" ? "root" : parent?.toString().split("_")[0],
        order: Number(siblingOrder),
      }
      mutate(data, {
        onError: () => {
          queryClient.invalidateQueries(["projects", { id: 1 }])
        },
      })
    }
  }

  function handleDragCancel() {
    resetState()
  }

  function resetState() {
    setOverId(null)
    setActiveId(null)
    setOffsetLeft(0)
    setCurrentPosition(null)

    document.body.style.setProperty("cursor", "")
  }

  function handleRemove(id: UniqueIdentifier) {
    setItems((items) => removeItem(items, id))
  }

  function handleCollapse(id: UniqueIdentifier) {
    setItems((items) =>
      setProperty(items, id, "collapsed", (value) => {
        return !value
      })
    )
  }

  function getMovementAnnouncement(
    eventName: string,
    activeId: UniqueIdentifier,
    overId?: UniqueIdentifier
  ) {
    if (overId && projected) {
      if (eventName !== "onDragEnd") {
        if (
          currentPosition &&
          projected.parentId === currentPosition.parentId &&
          overId === currentPosition.overId
        ) {
          return
        } else {
          setCurrentPosition({
            parentId: projected.parentId,
            overId,
          })
        }
      }

      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(items))
      )
      const overIndex = clonedItems.findIndex(({ id }) => id === overId)
      const activeIndex = clonedItems.findIndex(({ id }) => id === activeId)
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex)

      const previousItem = sortedItems[overIndex - 1]

      let announcement
      const movedVerb = eventName === "onDragEnd" ? "dropped" : "moved"
      const nestedVerb = eventName === "onDragEnd" ? "dropped" : "nested"

      if (!previousItem) {
        const nextItem = sortedItems[overIndex + 1]
        announcement = `${activeId} was ${movedVerb} before ${nextItem.id}.`
      } else {
        if (projected.depth > previousItem.depth) {
          announcement = `${activeId} was ${nestedVerb} under ${previousItem.id}.`
        } else {
          let previousSibling: FlattenedItem | undefined = previousItem
          while (previousSibling && projected.depth < previousSibling.depth) {
            const parentId: UniqueIdentifier | null = previousSibling.parentId
            previousSibling = sortedItems.find(({ id }) => id === parentId)
          }

          if (previousSibling) {
            announcement = `${activeId} was ${movedVerb} after ${previousSibling.id}.`
          }
        }
      }

      return announcement
    }

    return
  }
}

const adjustTranslate: Modifier = ({ transform }) => {
  return {
    ...transform,
    y: transform.y - 25,
  }
}
