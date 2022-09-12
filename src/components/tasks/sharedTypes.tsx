import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd"
import { DefaultProps } from "@mantine/core"
import { Task } from "../../types"

export interface TaskProps extends Task {
  draggableHandleProps: DraggableProvidedDragHandleProps | null
  isDragging?: boolean
  disableAnimation?: boolean
}
