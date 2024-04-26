import { Elysia, t } from "elysia";

export const SignDTO = new Elysia()
    .model({
        number: t.Number(),
        sign: t.Object({
            username: t.String(),
            password: t.String()
        })
    })