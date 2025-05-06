import React from "react";
import ReactDOM from "react-dom";
import { Separator } from "@radix-ui/react-dropdown-menu";

import { TaskDate } from "./task-date";
import { OverviewProperty } from "./overview-property";

import { useGetTask } from "../api/use-get-task";

import { snakeCaseToTitleCase } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const { data, error, isLoading } = useGetTask({ taskId });

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <PageError message="Failed to load task data" />;
  }

  return ReactDOM.createPortal(
    <Card
      className="absolute z-50 bg-white dark:bg-zinc-800 shadow-lg rounded-lg p-4 w-100 border-none"
      style={{ top: position.y, left: position.x }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <CardHeader className="flex flex-row items-center gap-x-4 p-3 space-y-0">
        <CardTitle className="text-xl font-bold">
          {data?.name || "Unnamed Task"}
        </CardTitle>
      </CardHeader>
      <div className="px-2 my-2 h-0.5 bg-gray-200">
        <Separator />
      </div>
      <CardContent className="flex flex-col gap-y-4 p-3">
        <OverviewProperty label="Assignee">
          <p className="text-sm font-medium">{data?.assignee.name || "Unassigned"}</p>
        </OverviewProperty>
        <OverviewProperty label="Due Date">
          <TaskDate value={data?.dueDate || ""} className="text-sm font-medium" />
        </OverviewProperty>
        <OverviewProperty label="Status">
          <Badge variant={data?.status} className="dark:text-zinc-800">
            {snakeCaseToTitleCase(data?.status || "BACKLOG")}
          </Badge>
        </OverviewProperty>
        <OverviewProperty label="Priority">
          <Badge variant={data?.priority} className="dark:text-zinc-800">
            {snakeCaseToTitleCase(data?.priority || "MEDIUM")}
          </Badge>
        </OverviewProperty>
        {(data?.description ?
          <OverviewProperty label="Description">
            <p className="text-sm font-medium">{data?.description || ""}</p>
          </OverviewProperty>
          : null)}
      </CardContent>
      {data?.comments && data?.comments.total > 0 && (
        <>
          <div className="px-2 my-2 h-0.5 bg-gray-200">
            <Separator />
          </div>
          <CardContent className="flex flex-col gap-y-4 p-3">
            <h4 className="text-sm font-semibold mb-2">Recent Comments</h4>
            <ul className="space-y-2">
              {data?.comments.documents.slice(-3).map((comment) => (
                <li
                  key={comment.$id}
                  className="text-sm text-zinc-700 dark:text-zinc-300 border-b pb-2 dark:border-zinc-600 last:border-none"
                >
                  <div className="flex items-start justify-between">
                    <p className="font-medium">{comment.userName}</p>
                    <span className="text-xs text-gray-500">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(comment.$createdAt))}
                    </span>
                  </div>
                  <p className="mt-1.5 break-words break-all">{comment.text}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </>
      )}
    </Card>,
    document.body
  );
};