import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { ProfileCard } from "@/features/auth/components/profile-card";

import { PageError } from "@/components/page-error";

const ProfilePage = async () => {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  const initialValues = { id: user?.$id, name: user?.name, email: user?.email };

  if (!initialValues) {
    return <PageError message="Profile not found" />
  }

  return <ProfileCard initialValues={initialValues} />
};

export default ProfilePage;