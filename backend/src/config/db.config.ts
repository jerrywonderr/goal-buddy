import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const dbConfig = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'localhost',
  password: 'localhost',
  database: 'goal_buddy_db',
  entities: [`${__dirname}/entities/*`],
  migrations: [`${__dirname}/migrations/*`],
  migrationsRun: false,
  synchronize: false,
});
