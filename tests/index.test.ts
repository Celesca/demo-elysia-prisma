import { describe, expect, it } from 'bun:test';
import { Elysia } from 'elysia';
import { app } from "../src/index";

describe('Elysia', () => {
    it('return a response', async () => {
        

        const response = await app
            .handle(new Request('http://localhost:/healthCheck'))
            .then((res) => res.json());

        expect(response).toEqual({ status: 'ok' });

        
    })
})