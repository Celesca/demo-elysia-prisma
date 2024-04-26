# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

### Create the new prisma model
`bunx prisma migrate dev --name create-post-model`

### Create the db seed for migration data
`bunx prisma db seed `

### Initialize Schema prisma
`prisma generate --schema=./alternative/schema.prisma`
`bunx prisma init`
