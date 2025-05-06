import { useState } from "react";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { TaskPriority, TaskStatus } from "../types";

import { TaskDetailsModal } from "./task-overview-modal";

import { Member } from "@/features/members/types";
import { Project } from "@/features/projects/types";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface EventCartProps {
  title: string;
  assignee: Member;
  project: Project;
  status: TaskStatus;
  priority: TaskPriority;
  id: string;
};

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "border-l-pink-500",
  [TaskStatus.TODO]: "border-l-red-500",
  [TaskStatus.IN_PROGRESS]: "border-l-yellow-500",
  [TaskStatus.IN_REVIEW]: "border-l-blue-500",
  [TaskStatus.DONE]: "border-l-emerald-500",
};

export const EventCard = ({
  title,
  assignee,
  project,
  status,
  priority,
  id,
}: EventCartProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const onClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();

    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  const [hoveredTask, setHoveredTask] = useState<string>("");
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number } | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isModalHovered, setIsModalHovered] = useState(false);

  const handleMouseEnter = (taskId: string, event: React.MouseEvent) => {
    const { clientX, clientY } = event;

    const timeout = setTimeout(() => {
      setHoveredTask(taskId);
      setModalPosition({
        x: clientX + window.scrollX - 20,
        y: clientY + window.scrollY - 20,
      });
    }, 500);

    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    if (!isModalHovered) {
      setHoveredTask("");
      setModalPosition(null);
    }
  };

  const handleModalMouseEnter = () => {
    setIsModalHovered(true);
  };

  const handleModalMouseLeave = () => {
    setIsModalHovered(false);
    setHoveredTask("");
    setModalPosition(null);
  };

  return (
    <div className="px-2">
      <div
        onClick={onClick}
        className={cn(
          "p-1.5 text-xs bg-white dark:bg-zinc-600 text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 hover:opacity-75 transition",
          statusColorMap[status],
          hoveredTask ?? "hover:cursor-wait"
        )}
        onMouseEnter={(e) => handleMouseEnter(id, e)}
        onMouseLeave={handleMouseLeave}
      >
        <p>{title}</p>
        <div className="flex items-center gap-x-1">
          <MemberAvatar
            name={assignee?.name}
            fallbackClassName="dark:bg-zinc-200"
          />
          <div className="size-1 rounded-full bg-neutral-300" />
          <ProjectAvatar
            name={project?.name}
            image={project?.imageUrl}
          />
        </div>
      </div>

      {hoveredTask && modalPosition && (
        <TaskDetailsModal
          taskId={hoveredTask}
          position={modalPosition}
          onMouseEnter={handleModalMouseEnter}
          onMouseLeave={handleModalMouseLeave}
        />
      )}
    </div>
  )
}