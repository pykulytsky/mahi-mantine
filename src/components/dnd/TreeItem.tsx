import React, { forwardRef, HTMLAttributes } from "react"
import classNames from "classnames"

import styles from "./TreeItem.module.css"
import type { Task as TaskType } from "../../types"
import Task from "../tasks/Task/Task"

export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, "id"> {
  name: string
  isTask?: boolean
  isSection?: boolean
  task?: TaskType
  childCount?: number
  clone?: boolean
  collapsed?: boolean
  depth: number
  disableInteraction?: boolean
  disableSelection?: boolean
  ghost?: boolean
  handleProps?: any
  indicator?: boolean
  indentationWidth: number
  value: string
  onCollapse?(): void
  onRemove?(): void
  wrapperRef?(node: HTMLLIElement): void
}

export const TreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      childCount,
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      onRemove,
      style,
      wrapperRef,
      name,
      task,
      ...props
    },
    ref
  ) => {
    return (
      <li
        className={classNames(
          styles.Wrapper,
          clone && styles.clone,
          ghost && styles.ghost,
          indicator && styles.indicator,
          disableSelection && styles.disableSelection,
          disableInteraction && styles.disableInteraction
        )}
        ref={wrapperRef}
        style={
          {
            "--spacing": `${indentationWidth * depth}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        {/*replace this div*/}
        <div ref={ref} style={style}>
          {task && (
            <Task
              draggableHandleProps={handleProps}
              {...task}
              onCollapse={onCollapse}
              collapsed={collapsed}
            />
          )}
        </div>
      </li>
    )
  }
)
