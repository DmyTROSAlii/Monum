import { z } from "zod";
import { Hono } from "hono";
import { Query } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";
import { createAdminClient } from "@/lib/appwrite";
import { DATABASES_ID, MEMBERS_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono().get("/", sessionMiddleware, async (c) => {
  const user = c.get("user");
  const databases = c.get("databases");

  const members = await databases.listDocuments(DATABASES_ID, MEMBERS_ID, [
    Query.equal("userId", user.$id),
  ]);

  if (members.total === 0) {
    return c.json({ data: { documents: [], total: 0 } });
  }

  return c.json({ data: { user } });
});

export default app;
