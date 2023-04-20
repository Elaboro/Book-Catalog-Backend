import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

// settings from src/app.module.ts 
const data_source = new DataSource({
  type: "postgres",
  host: process.env.APP_POSTGRES_HOST,
  port: Number(process.env.APP_POSTGRES_PORT),
  username: process.env.APP_POSTGRES_USERNAME,
  password: process.env.APP_POSTGRES_PASSWORD,
  database: process.env.APP_POSTGRES_DATABASE,
  synchronize: false,
  entities: ["src/**/*.entity.{ts, js}"],
  subscribers: ["src/subscriber/*.{ts, js}"],
  migrations: ["src/migration/*.{ts, js}"],
  logging: (process.env.APP_POSTGRES_LOGGING?.toLowerCase() === "true"),
});

export default data_source;