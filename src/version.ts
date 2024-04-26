import { Elysia } from "elysia";

export const version = (version: string = "1.0") => new Elysia()
    .get("/version", version);

export const plugin = (app: Elysia) => 
    app.state('counter', 0)