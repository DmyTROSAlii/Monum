import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";

import { AnalyticsCard } from "./analycs-card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
  return (
    <ScrollArea className="border dark:border-white rounded-lg w-full whitespace-nowrap shrink-0">
      <div className="w-full flex flex-row">
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Total Tasks"
            value={data.taskCount}
            variant={data.taskDifference > 0 ? "up" : "down"}
            increaseValue={data.taskDifference}
          />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Assigned Tasks"
            value={data.assigneedTaskCount}
            variant={data.assigneedTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.assigneedTaskDifference}
          />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Completed Tasks"
            value={data.completedTaskCount}
            variant={data.completedTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.completedTaskDifference}
          />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Overdue Tasks"
            value={data.overdueTaskCount}
            variant={data.overdueTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.overdueTaskDifference}
          />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Incompleted Tasks"
            value={data.incompleteTaskCount}
            variant={data.incompleteTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.incompleteTaskDifference}
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};