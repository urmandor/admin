import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: 'password',
  database: 'db',
  migrationsTableName: 'migrations_table',
  entities: ['src/models/*.ts'],
  migrations: ['src/migrations/*.ts'],
});

AppDataSource.initialize().catch((err) => {
  console.error('Error during Data Source initialization', err);
});
