import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import { swagger } from '@elysiajs/swagger';
import { version, plugin } from './version';
import postController from "./post/PostController";
import loginController from "./login/LoginController";

const db = new PrismaClient();

const app = new Elysia()
  .use(swagger())
  .use(version("1.0.0"))
  .group('/api', (app) => app.use(postController))
  .use(loginController)
  .get("/healthCheck", async () => ({ status: "ok" }))
  .onError(({ code }) => {
    if (code === "NOT_FOUND") return "Route not found :(";
    else return "Internal Server Error :(";
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export default app;