"use client";

import { Separator } from "@radix-ui/react-dropdown-menu";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";

import { useGetTask } from "@/features/tasks/api/use-get-task";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";
import { TaskOverview } from "@/features/tasks/components/task-overview";
import { TaskBreadcrumbs } from "@/features/tasks/components/task-breadcrumbs";
import { TaskDescription } from "@/features/tasks/components/task-description";
import { TaskComments } from "@/features/tasks/components/task-comments";

export const TaskIdClient = () => {
  const taskId = useTaskId();
  const { data, isLoading } = useGetTask({ taskId });

  if (isLoading) {
    return <PageLoader />
  }

  if (!data) {
    return <PageError message="Task not found" />
  }

  return (
    <div className="flex flex-col">
      <TaskBreadcrumbs project={data.project} task={data} />
      <div className="my-6 h-0.5 bg-gray-200">
        <Separator />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskOverview task={data} />
        <TaskDescription task={data} />
        <TaskComments comments={data.comments.documents} taskId={taskId} />
      </div>
    </div>
  );
};