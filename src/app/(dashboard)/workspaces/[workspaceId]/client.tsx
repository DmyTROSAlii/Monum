"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { CalendarIcon, PlusIcon, SettingsIcon } from "lucide-react";

import { Task } from "@/features/tasks/types";
import { Member } from "@/features/members/types";
import { Project } from "@/features/projects/types";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics";

import { Button } from "@/components/ui/button";
import { Analytics } from "@/components/analytics";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Card, CardContent } from "@/components/ui/card";

export const WorkspaceIdClient = () => {
  const workspaceId = useWorkspaceId();

  const { data: analytics, isLoading: isLoadingAnalytics } = useGetWorkspaceAnalytics({ workspaceId });
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({ workspaceId });
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId });

  const isLoading = isLoadingAnalytics || isLoadingTasks || isLoadingProjects || isLoadingMembers;

  if (isLoading) {
    return <PageLoader />
  }

  if (!analytics || !tasks || !projects || !members) {
    return <PageError message="Failed to load workspace data" />
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <Analytics data={analytics} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TasksList data={tasks.documents} total={tasks.total} />
        <ProjectsList data={projects.documents} total={projects.total} />
        <MembersList data={members.documents} total={members.total} />
      </div>
    </div>
  );
};

interface TasksListProps {
  data: Task[];
  total: number
};

export const TasksList = ({ data, total }: TasksListProps) => {
  const workspaceId = useWorkspaceId();
  const { open: createTask } = useCreateTaskModal();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted dark:bg-zinc-800 rounded-lg p-4">
        <div className="flex flex-col items-center">
          <div className="flex w-full justify-between">
            <p className="text-lg font-semibold">
              Assigned Tasks ({total})
            </p>
            <Button variant="muted" size="icon" onClick={() => createTask()}>
              <PlusIcon className="size-4 text-neutral-400 dark:text-neutral-800" />
            </Button>
          </div>
          <div className="px-2 mx-8 my-4 w-full h-0.5 bg-gray-200">
            <Separator />
          </div>
          <ul className="flex flex-col gap-y-4 w-full">
            {data.map((task) => (
              <li key={task.$id}>
                <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                  <Card className="shadow-none rounded-lg hover:opacity-75 transition dark:bg-[#ffffff1a]">
                    <CardContent className="p-4">
                      <p className="text-lg font-medium truncate">{task.name}</p>
                      <div className="flex items-center gap-x-2">
                        <p>{task.project?.name}</p>
                        <div className="size-1 rounded-full bg-neutral-300" />
                        <div className="text-sm text-muted-foreground flex items-center">
                          <CalendarIcon className="size-3 mr-1" />
                          <span className="truncate">
                            {formatDistanceToNow(new Date(task.dueDate))}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))}
            <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
              No task found
            </li>
          </ul>
          <Button variant="muted" className="mt-4 w-full dark:hover:text-neutral-200" asChild>
            <Link href={`/workspaces/${workspaceId}/tasks`}>
              Show all
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

interface ProjectsListProps {
  data: Project[];
  total: number
};

export const ProjectsList = ({ data, total }: ProjectsListProps) => {
  const workspaceId = useWorkspaceId();
  const { open: createProject } = useCreateProjectModal();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white dark:bg-zinc-800 border rounded-lg p-4">
        <div className="flex flex-col items-center">
          <div className="flex w-full justify-between">
            <p className="text-lg font-semibold">
              Projects ({total})
            </p>
            <Button variant="secondary" size="icon" onClick={createProject}>
              <PlusIcon className="size-4 text-neutral-400 dark:text-zinc-800" />
            </Button>
          </div>
          <div className="px-2 mx-8 my-4 w-full h-0.5 bg-gray-200">
            <Separator />
          </div>
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            {data.map((project) => (
              <li key={project.$id}>
                <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
                  <Card className="shadow-none rounded-lg hover:opacity-75 transition dark:bg-[#ffffff1a]">
                    <CardContent className="p-4 flex items-center gap-x-2.5">
                      <ProjectAvatar
                        className="size-12"
                        fallbackClassName="text-lg"
                        name={project.name}
                        image={project.imageUrl}
                      />
                      <p className="text-lg font-medium truncate">
                        {project.name}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))}
            <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
              No projects found
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

interface MemberstListProps {
  data: Member[];
  total: number
};

export const MembersList = ({ data, total }: MemberstListProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white dark:bg-zinc-800 border rounded-lg p-4">
        <div className="flex flex-col items-center">
          <div className="flex w-full justify-between">
            <p className="text-lg font-semibold">
              Members ({total})
            </p>
            <Button asChild variant="secondary" size="icon">
              <Link href={`/workspaces/${workspaceId}/members`}>
                <SettingsIcon className="size-4 text-neutral-400 dark:text-zinc-800" />
              </Link>
            </Button>
          </div>
          <div className="px-2 mx-8 my-4 w-full h-0.5 bg-gray-200">
            <Separator />
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {data.map((member) => (
              <li key={member.$id}>
                <Card className="shadow-none rounded-lg overflow-hidden dark:bg-[#ffffff1a]">
                  <CardContent className="p-3 flex flex-col items-center gap-x-2">
                    <MemberAvatar
                      className="size-12"
                      name={member.name}
                    />
                    <div className="flex flex-col items-center overflow-hidden">
                      <p className="text-lg font-medium line-clamp-1">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {member.email}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
            <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
              No members found
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};