import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { SignUpCard } from "@/features/auth/components/sign-up-card";

interface SignUpPageProps {
    searchParams: {
      redirect?: string;
    };
}

const SignUpPage = async ({ searchParams }: SignUpPageProps) => {
    const user = await getCurrent();

    const redirectString = searchParams.redirect ?? '/';

    if (user) redirect(redirectString);

    return <SignUpCard />
};

export default SignUpPage;