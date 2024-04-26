import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import { swagger } from '@elysiajs/swagger';

const db = new PrismaClient();

const app = new Elysia()
  .use(swagger())
  .model({
    'user.sign': t.Object({
      username: t.String(),
      password: t.String({
        minLength: 8,
      }),
    })
  })
  .post(
    "/sign-up",
    async ({ body }) =>
      db.user.create({
        data: body,
        select: {
          id: true,
          username: true,
        }
      }),
    {
      error({ code }) {
        switch (code) {
          case 'P2002':
            return {
              error: "Username must be unique",
            };
        }
      },
      body: 'user.sign',
      response: t.Object({
        id: t.Number(),
        username: t.String()
      })
    }
  )
  .get("/healthCheck", async () => ({ status: "ok" }))
  .onError(({ code }) => {
    if (code === "NOT_FOUND") return "Route not found :(";
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
