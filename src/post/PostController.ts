import { Elysia } from 'elysia';

const postController = new Elysia({ prefix: '/posts'})
    .get('/', () => 'get all posts')
    .get('/:id', () => 'get post by id')
    .post('/', () => 'create post')
    .patch('/:id', () => 'update post')
    .delete('/', () => 'delete post');

export default postController;