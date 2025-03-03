import { redirect } from "next/navigation";

import { TaskIdClient } from "./client";

import { getCurrent } from "@/features/auth/queries"

const TaskIdPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-up");

  return <TaskIdClient />
}

export default TaskIdPage;