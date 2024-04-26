import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import { swagger } from '@elysiajs/swagger';
import { version, plugin } from './version';

const db = new PrismaClient();

const app = new Elysia()
  .use(swagger())
  .use(version("1.0.0"))
  .use(plugin)
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
      body: 'user.sign',
      response: t.Object({
        id: t.Number(),
        username: t.String()
      })
    }
  )
  .post('/name/:id', () => "Hello World", {
    query: t.Object({
      name: t.String()
    }),
    body: t.Object({
      name: t.String()
    }),
    params: t.Object({
      id: t.Numeric()
    })
  })
  .get("/healthCheck", async () => ({ status: "ok" }))
  .get('/id/:id', ({ params: { id }}) => id, {
    params: t.Object({
      id: t.Numeric()
    })
  })
  .get('/counter', ({ store: { counter } }) => {
      return counter;

  })
  .onError(({ code }) => {
    if (code === "NOT_FOUND") return "Route not found :(";
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
