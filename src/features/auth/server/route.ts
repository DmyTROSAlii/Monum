import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";
import { deleteCookie, setCookie } from "hono/cookie";

import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";

import { AUTH_COOKIE } from "../constants";
import { loginScheme, registerScheme, updateProfileScheme } from "../schemas";
import { DATABASES_ID, MEMBERS_ID } from "@/config";

const app = new Hono()
  .get("/current", sessionMiddleware, (c) => {
    const user = c.get("user");

    return c.json({ data: user });
  })
  .post("/login", zValidator("json", loginScheme), async (c) => {
    const { email, password } = c.req.valid("json");

    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ success: true });
  })
  .post("/register", zValidator("json", registerScheme), async (c) => {
    const { name, email, password } = c.req.valid("json");

    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password, name);

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ success: true });
  })
  .post("/logout", sessionMiddleware, async (c) => {
    const account = c.get("account");

    deleteCookie(c, AUTH_COOKIE);
    await account.deleteSession("current");

    return c.json({ success: true });
  })
  .patch(
    "/profile/:profileId",
    zValidator("form", updateProfileScheme),
    sessionMiddleware,
    async (c) => {
      const user = c.get("user");
      const account = c.get("account");

      const { profileId } = c.req.param();
      const { name, email, password } = c.req.valid("form");

      if (user.$id !== profileId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (name && name !== user.name) {
        await account.updateName(name);
      }

      if (email && password && email !== user.email) {
        try {
          await account.updateEmail(email, password);
        } catch (e) {
          return c.json({ error: e });
        }
      }

      return c.json({ data: { name, email } });
    }
  )
  .delete("/profile/:profileId", sessionMiddleware, async (c) => {
    const databases = c.get("databases");

    const { profileId } = c.req.param();

    try {
      const membersList = await databases.listDocuments(
        DATABASES_ID,
        MEMBERS_ID,
        [Query.equal("userId", profileId)]
      );

      for (const document of membersList.documents) {
        await databases.deleteDocument(DATABASES_ID, MEMBERS_ID, document.$id);
      }
    } catch (error) {
      return c.json(
        { error: "Failed to delete user data", details: error },
        500
      );
    }

    return c.json({ success: true, data: { $id: profileId } });
  });

export default app;
