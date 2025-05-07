import { redirect } from "next/navigation";

import { TaskIdClient } from "./client";

import { getCurrent } from "@/features/auth/queries"

interface TaskIdPageProps {
  params: {
    workspaceId: string;
    taskId: string;
  };
};

const TaskIdPage = async ({ params }: TaskIdPageProps) => {
  const user = await getCurrent();

  if (!user) redirect(`/sign-up?redirect=/dashboard/workspaces/${params.workspaceId}/tasks/${params.taskId}`);

  return <TaskIdClient />
}

export default TaskIdPage;