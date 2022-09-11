import { Task as TaskProp } from "../../types"
import { Draggable } from "@hello-pangea/dnd"
import Task from "./Task"

export default function DraggableTaskList(tasks: TaskProp[], uuid?: string) {
  return tasks.map((task, index) => (
    <Draggable
      key={task.order}
      draggableId={`${uuid}_${task.order}`}
      index={index}
    >
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Task
            {...task}
            draggableHandleProps={provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          />
        </div>
      )}
    </Draggable>
  ))
}
