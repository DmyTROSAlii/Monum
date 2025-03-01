import { getMember } from "../members/utils";
import { createSessionClient } from "@/lib/appwrite";
import { DATABASES_ID, PROJECTS_ID, WORKSPACES_ID } from "@/config";
import { Project } from "./types";

interface GetProjectProps {
  projectId: string;
}

export const getProject = async ({ projectId }: GetProjectProps) => {
  const { databases, account } = await createSessionClient();

  const user = await account.get();

  if (!projectId) {
    throw new Error("Project ID is missing");
  }

  const project = await databases.getDocument<Project>(
    DATABASES_ID,
    PROJECTS_ID,
    projectId
  );

  const member = await getMember({
    databases,
    userId: user.$id,
    workspaceId: project.workspaceId,
  });

  if (!member) {
    throw new Error("Unauthorized");
  }

  return project;
};
