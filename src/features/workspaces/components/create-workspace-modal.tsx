"use-client";

import { CreateWorkspaceForm } from "./create-workspace-form";
import { ResponsiveModal } from "@/components/responsice-modal";
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";

export const CreateWorkspaceModal = () => {
  // const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();
  const { isOpen, setIsOpen } = useCreateWorkspaceModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      {/* <CreateWorkspaceForm onCancel={close} /> */}
      <CreateWorkspaceForm />
    </ResponsiveModal>
  )
};