import { registerAs } from '@nestjs/config';

export const dbConfig = registerAs('database', () => ({
  type: 'postgres',
  host: process.env['DB_HOST'],
  port: process.env['DB_PORT'] ? +process.env['DB_PORT'] : 3030,
  username: process.env['DB_USER'],
  password: process.env['DB_PASS'],
  database: process.env['DB_NAME'],
  entities: [`dist/**/entities/*.entity.js`],
  subscribers: [`dist/**/db/subscribers/*.subscriber.js`],
  migrationsRun: false,
  synchronize: false
}));
