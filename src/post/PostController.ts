import { Elysia, t } from 'elysia';
import {
    createPost,
    getPost,
    getPosts,
    updatePost,
    deletePost
} from './PostHandlers';

const postController = new Elysia({ prefix: '/posts'})
    .model({
        'post.body': t.Object({
            title: t.String()
        }),
        'post.id': t.Object({
            id: t.Numeric()
        })
    })
    .get('/', () => getPosts())
    .get('/:id', 
    ({ params: { id } }) => getPost(id), {
        params: t.Object({
            id: t.Numeric()
        })
    })
    .post('/', ({ body }) => createPost(body), {
        body: 'post.body'
    })
    .patch('/:id', ({ params : { id } , body}) => updatePost(id, body), {
        params: t.Object({
            id: t.Numeric()
        }),
        body: 'post.body'
    }
    )
    .delete('/', () => 'delete post');

export default postController;