import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

import { ProfileIdSettingClient } from "./client";

const ProfileIdSettingPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <ProfileIdSettingClient />
};

export default ProfileIdSettingPage;