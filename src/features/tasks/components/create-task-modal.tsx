"use client";

import { ResponsiveModal } from "@/components/responsice-modal";

import { useCreateTaskModal } from "../hooks/use-create-task-modal";

import { CreateTaskFormWrapper } from "./create-task-form-wrapper";

export const CreateTaskModal = () => {
  const { isOpen, close, setIsOpen, status } = useCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper onCancel={close} status={status || "BACKLOG"} />
    </ResponsiveModal>
  );
};