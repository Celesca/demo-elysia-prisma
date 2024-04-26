import { Elysia, t } from 'elysia';
import {
    createPost,
    getPost,
    getPosts,
    updatePost,
    deletePost
} from './PostHandlers';

const postController = new Elysia({ prefix: '/posts'})
    .get('/', () => getPosts())
    .get('/:id', 
    ({ params: { id } }) => getPost(id), {
        params: t.Object({
            id: t.Numeric()
        })
    })
    .post('/', () => 'create post')
    .patch('/:id', () => 'update post')
    .delete('/', () => 'delete post');

export default postController;