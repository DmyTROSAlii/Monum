"use client";

import { useQueryState, parseAsBoolean, parseAsString } from "nuqs";

import { TaskStatus } from "../types";

export const useCreateTaskModal = (board?: TaskStatus) => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-task",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );
  const [status, setStatus] = useQueryState(
    "task-status",
    parseAsString.withDefault(board || "").withOptions({ clearOnDefault: true })
  );

  const open = (board?: TaskStatus) => {
    setStatus(board || "");
    setIsOpen(true);
  };

  const close = () => {
    setStatus("");
    setIsOpen(false);
  };

  return {
    isOpen,
    open,
    close,
    setIsOpen,
    status: status || undefined,
  };
};
