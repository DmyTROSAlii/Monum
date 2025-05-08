import { redirect } from "next/navigation";

import { TaskIdClient } from "./client";

import { getCurrent } from "@/features/auth/queries"

const TaskIdPage = async ({ params }: { params: Promise<{ workspaceId: string; taskId: string; }> }) => {
  const user = await getCurrent();

  if (!user) {
    const { workspaceId, taskId } = await params;
    redirect(`/sign-up?redirectUrl=/workspaces/${workspaceId}/tasks/${taskId}`);
  }

  return <TaskIdClient />
}

export default TaskIdPage;