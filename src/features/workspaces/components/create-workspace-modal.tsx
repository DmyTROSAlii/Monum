"use client";

import { CreateWorkspaceForm } from "./create-workspace-form";
import { ResponsiveModal } from "@/components/responsice-modal";
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";

export const CreateWorkspaceModal = () => {
  const { isOpen, close, setIsOpen } = useCreateWorkspaceModal();
  // const [ isOpen, setIsOpen ] = useState(false);

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
        <CreateWorkspaceForm onCancel={close} />
    </ResponsiveModal>
  );
};