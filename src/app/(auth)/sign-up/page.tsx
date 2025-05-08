import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { SignUpCard } from "@/features/auth/components/sign-up-card";

const TaskIdPage = async ({ searchParams }: { searchParams: Promise<{ redirectUrl: string | undefined; }> }) => {
  const user = await getCurrent();

  if (user) {
    const { redirectUrl } = await searchParams;

    redirect(redirectUrl || "/");
  }

  return <SignUpCard />;
}

export default TaskIdPage;