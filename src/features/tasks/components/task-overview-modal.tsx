import React from "react";
import ReactDOM from "react-dom";

import { useGetTask } from "../api/use-get-task";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";

interface TaskDetailsModalProps {
  taskId: string;
  position: { x: number; y: number };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const TaskDetailsModal = ({
  taskId,
  position,
  onMouseEnter,
  onMouseLeave,
}: TaskDetailsModalProps) => {
  const { data: task, error, isLoading } = useGetTask({ taskId });

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <PageError message="Failed to load task data" />;
  }

  return ReactDOM.createPortal(
    <div
      className="absolute z-50 bg-white dark:bg-zinc-800 shadow-lg rounded-lg p-4 w-80"
      style={{ top: position.y, left: position.x }}
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave}
    >
      {task && (
        <>
          <h3 className="text-lg font-semibold mb-2">{task.name}</h3>
          <div className="text-sm text-gray-500 space-y-1">
            <p>
              <span className="font-medium">Project:</span>{" "}
              {task.project?.name || "N/A"}
            </p>
            <p>
              <span className="font-medium">Assignee:</span>{" "}
              {task.assignee?.name || "N/A"}
            </p>
            <p>
              <span className="font-medium">Due Date:</span> {task.dueDate}
            </p>
            <p>
              <span className="font-medium">Status:</span> {task.status}
            </p>
          </div>
          <p className="text-sm mt-4">{task.description}</p>

          {task.comments && task.comments.total > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Recent Comments</h4>
              <ul className="space-y-2">
                {task.comments.documents.slice(0, 3).map((comment) => (
                  <li
                    key={comment.$id}
                    className="text-sm text-gray-700 dark:text-gray-300 border-b pb-2 last:border-none"
                  >
                    <p className="font-medium">{comment.userName}</p>
                    <p>{comment.text}</p>
                    <span className="text-xs text-gray-500">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(comment.$createdAt))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>,
    document.body
  );
};