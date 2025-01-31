import { Hono } from "hono";
import { ID } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";
import { createWorkspaceScheme } from "../shemas";
import { DATABASES_ID, WORKSPACES_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono()
  .post(
    "/",
    zValidator("json", createWorkspaceScheme),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");

      const { name } = c.req.valid("json");

      const workspaces = await databases.createDocument(
        DATABASES_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
        },
      );

      return c.json({ data: workspaces });
    }
  );

export default app;