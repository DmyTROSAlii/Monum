import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { SignUpCard } from "@/features/auth/components/sign-up-card";

const SignUpPage = async ({ params }: { params: { redirect: string }; }) => {
    const user = await getCurrent();

    if (user) {
        if (params.redirect) redirect(params.redirect as string);

        redirect("/");
    }

    return <SignUpCard />
};

export default SignUpPage;