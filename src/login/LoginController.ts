import { Elysia, t} from "elysia";
import { SignDTO } from "../models/admin.model";
import { plugin } from "../version";

const loginController = new Elysia()
    .use(SignDTO)
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
        {
        body: 'user.sign',
        response: t.Object({
            id: t.Number(),
            username: t.String()
        })
        }
    )
    // Validation Path
    .post('/name/:id', ({ cookie }) => cookie + "Hello World", {
        cookie: t.Object({
        session: t.String()
        }),
        query: t.Object({
        name: t.String(),
        alias: t.Optional(t.String()),
        }, {
        error: "Invalid Query UwU"
        }),
        body: t.Object({
        name: t.String()
        }),
        params: t.Object({
        id: t.Numeric()
        }),
        headers: t.Object({
        authorization: t.String()
        }),
        response: {
        200: t.String(),
        400: t.Number()
        }
    })
    // Reference Model Validation
    .post('/sign-in' , ({ body }) => body, {
        body: 'sign',
        resposne: 'sign'
    })
    .get('/id/:id', ({ params: { id }}) => id, {
        params: t.Object({
          id: t.Numeric()
        })
      })
      .get('/counter', ({ store: { counter } }) => {
          return counter;
      })

export default loginController;