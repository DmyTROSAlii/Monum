import { Hono } from "hono";
import { ID } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";
import { createWorkspaceScheme } from "../shemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASES_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from "@/config";

const app = new Hono()
  .post(
    "/",
    zValidator("form", createWorkspaceScheme),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { name, image } = c.req.valid("form");

      let uploadedImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image,
        );

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID,
          file.$id,
        );

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
      }

      const workspaces = await databases.createDocument(
        DATABASES_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageUrl: uploadedImageUrl,
        },
      );

      return c.json({ data: workspaces });
    }
  );

export default app;