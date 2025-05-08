import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { TaskIdClient } from "./client";

import { getCurrent } from "@/features/auth/queries"

const TaskIdPage = async ({ params }: { params: Promise<{workspaceId: string; taskId: string; }> }) => {
  const user = await getCurrent();

  if (!user) {
    const { workspaceId, taskId } = await params;

    (await cookies()).set("redirectAfterAuth", `/workspaces/${workspaceId}/tasks/${taskId}`, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    redirect("/sign-up");
  }

  return <TaskIdClient />
}

export default TaskIdPage;