import { z } from "zod";

export const createWorkspaceScheme = z.object({
  name: z.string().trim().min(1, "Required"),
});