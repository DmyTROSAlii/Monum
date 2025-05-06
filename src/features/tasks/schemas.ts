import { z } from "zod";

import { TaskPriority, TaskStatus } from "./types";

export const createTaskSchema = z.object({
  name: z.string().min(1, "Required"),
  status: z.nativeEnum(TaskStatus, { required_error: "Required" }),
  priority: z.nativeEnum(TaskPriority, { required_error: "Required" }),
  workspaceId: z.string().trim().min(1, "Required"),
  projectId: z.string().trim().min(1, "Required"),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "Required"),
  description: z.string().optional(),
});

export const createTaskComment = z.object({
  text: z.string().min(1, "Required"),
});
