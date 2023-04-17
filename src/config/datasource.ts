import { DataSource } from "typeorm";
import cfg from "./app.config";

export const dataSourcePostgres = new DataSource({
  type: "postgres",
  host: cfg.APP_POSTGRES_HOST,
  port: cfg.APP_POSTGRES_PORT,
  username: cfg.APP_POSTGRES_USERNAME,
  password: cfg.APP_POSTGRES_PASSWORD,
  database: cfg.APP_POSTGRES_DATABASE,
  synchronize: false,
  logging: (cfg.APP_POSTGRES_LOGGING?.toLowerCase() === "true"),
  entities: [],
  subscribers: ["src/subscriber/*.{ts, js}"],
  migrations: ["src/migration/*.{ts, js}"],
});
