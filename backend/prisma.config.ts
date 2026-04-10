import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const host = process.env.DB_HOST!;
const port = process.env.DB_PORT!;
const user = process.env.DB_USER!;
const password = process.env.DB_PASSWORD!;
const db = process.env.DB_NAME!;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: `postgresql://${user}:${password}@${host}:${port}/${db}?schema=public`,
  },
});
