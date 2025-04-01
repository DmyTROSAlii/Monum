"use client";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useCurrent } from "@/features/auth/api/use-current";

export const ProfileIdSettingClient = () => {
  // const workspaceId = useWorkspaceId();
  // const { data: initialValues, isLoading } = useGetWorkspace({ workspaceId });

  // if (isLoading) {
  //   return <PageLoader />
  // }

  // if (!initialValues) {
  //   return <PageError message="Workspace not found" />
  // }

  // const { data: user, isLoading } = useCurrent();

  // if (!user) {
  //   console.log("not find user")
  //   console.log(user)
  // } else {
  //   console.log("Profile Settings:")
  //   console.log(user)
  // }

  return (
    <div className="w-full lg:max-w-xl">
      Profile Settings:
      {/* <EditWorkspaceForm initialValues={initialValues} /> */}
    </div>
  );
};