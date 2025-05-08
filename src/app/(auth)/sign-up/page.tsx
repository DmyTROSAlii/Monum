import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { SignUpCard } from "@/features/auth/components/sign-up-card";

export default async function SignUpPage() {
  const user = await getCurrent();

  if (user) {
    const cookieStore = cookies();
    const redirectPath = (await cookieStore).get("redirectAfterAuth")?.value || "/";

    redirect(redirectPath);
  }

  return <SignUpCard />;
}
