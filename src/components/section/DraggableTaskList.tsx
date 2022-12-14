import { Task as TaskProp } from "../../types"
import { Draggable } from "@hello-pangea/dnd"
import Task from "../tasks/Task/Task"

export default function DraggableTaskList(tasks: TaskProp[]) {
  return tasks.map((task, index) => (
    <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
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
