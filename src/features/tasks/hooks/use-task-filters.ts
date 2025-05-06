import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

import { TaskPriority, TaskStatus } from "../types";

export const useTaskFilters = () => {
  return useQueryStates({
    projectId: parseAsString,
    status: parseAsStringEnum(Object.values(TaskStatus)),
    priority: parseAsStringEnum(Object.values(TaskPriority)),
    assigneeId: parseAsString,
    search: parseAsString,
    dueDate: parseAsString,
  });
};
