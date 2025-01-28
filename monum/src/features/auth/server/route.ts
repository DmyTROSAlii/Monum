import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { loginScheme, registerScheme } from "../schemas";

const app = new Hono()
    .post(
        "/login",
        zValidator("json", loginScheme),
        async (c) => {
            const { email, password } = c.req.valid("json");

            console.log({ email, password });

            return c.json({ email, password });
        })
    .post(
        "/register",
        zValidator("json", registerScheme),
        async (c) => {
            const { name, email, password } = c.req.valid("json");

            console.log({ name, email, password });

            return c.json({ name, email, password });
        })

export default app;