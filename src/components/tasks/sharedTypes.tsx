import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { DefaultProps } from "@mantine/core";


export interface TaskProps extends DefaultProps {
  id: number;
  order: number;
  name: string;
  isDone: boolean;
  draggableHandleProps?: DraggableProvidedDragHandleProps;
  isDragging?: boolean;
}
