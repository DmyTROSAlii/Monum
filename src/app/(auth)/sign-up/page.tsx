import { redirect } from "next/navigation";

// Removed invalid import for PageProps

import { getCurrent } from "@/features/auth/queries";
import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { PageProps } from "../../../../.next/types/app/(dashboard)/workspaces/[workspaceId]/tasks/[taskId]/page";

export default async function SignUpPage({
    searchParams,
  }: {
    searchParams?: PageProps["searchParams"];
  }) {
    const user = await getCurrent();

    const resolvedSearchParams = await searchParams;
    const redirectUrl = resolvedSearchParams?.redirect || "/";

    if (user) redirect(redirectUrl);

    return <SignUpCard />;
}
