import React, { useCallback, useEffect, useState } from "react";

import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";

import { Task, TaskStatus } from "../types";

import { KanbanCard } from "./kanban-card";
import { KanbanColumnHeader } from "./kanban-column-header";

const boards: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE,
];

type TasksState = {
  [key in TaskStatus]: Task[];
}

interface DataKanbanProps {
  data: Task[];
};


export const DataKanban = ({ data }: DataKanbanProps) => {
  const [tasks, setTasks] = useState<TasksState>(() => {
    const initialTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };

    data.forEach((task) => {
      initialTasks[task.status].push(task);
    });

    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as TaskStatus].sort((a, b) => a.position - b.position);
    });

    return initialTasks;
  });

//   const onDragEnd = useCallback((result: DropResult) => {
//     if (!result.destination) return;

//     const { source, destination } = result;
//     const sourceStatus = source.droppableId as TaskStatus;
//     const destStatus = destination.droppableId as TaskStatus;

//     let updatesPauload: ($id: string; status: TaskStatus; position: number; )[] = [];

//   setTasks((prevTasks) => {
//     const newTask = { ...prevTasks };

//     const sourceColumn = [...newTasks[sourceStatus]];
//     const [movedTask] = sourceColumn.splice(source.index, 1);
//   })
// });

return (
  <DragDropContext onDragEnd={() => { }}>
    <div className="flex overflow-x-auto">
      {boards.map((board) => {
        return (
          <div key={board} className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]">
            <KanbanColumnHeader
              board={board}
              taskCount={tasks[board].length}
            />
            <Droppable droppableId={board}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[200px] py-1.5"
                >
                  {tasks[board].map((task, index) => (
                    <Draggable
                      key={task.$id}
                      draggableId={task.$id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <KanbanCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )
      })}
    </div>
  </DragDropContext>
);
};