import { Elysia, t } from "elysia";
import {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
} from "./PostHandlers";

const postController = new Elysia({ prefix: "/posts" })
  .model({
    "post.body": t.Object({
      title: t.String(),
      content: t.String(),
    }),
    "post.id": t.Object({
      id: t.Numeric(),
    }),
  })
  .get("/", () => getPosts())
  .get("/:id", ({ params: { id } }) => getPost(id), {
    params: "post.id",
  })
  .post("/", ({ body }) => createPost(body), {
    body: "post.body",
  })
  .patch("/:id", ({ params: { id }, body }) => updatePost(id, body), {
    params: "post.id",
    body: "post.body",
  })
  .delete("/", ({ body }) => deletePost(body), {
    body: t.Object({
        id: t.Numeric()
    })
  });

export default postController;
