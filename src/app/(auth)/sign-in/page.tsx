import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { SignInCard } from "@/features/auth/components/sign-in-card";

const SignInPage = async ({ searchParams }: { searchParams: Promise<{ redirectUrl: string | undefined; }> }) => {
    const user = await getCurrent();

    if (user) {
      const { redirectUrl } = await searchParams;

      redirect(redirectUrl || "/");
    }

    return <SignInCard />
};

export default SignInPage;