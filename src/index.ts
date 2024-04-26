import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const app = new Elysia()
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
