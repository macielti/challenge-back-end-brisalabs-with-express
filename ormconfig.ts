import { config } from "dotenv";

const { NODE_ENV } = process.env;
const baseEnvFilesPath = "./envs";
const envFilesPath = {
  dev: `${baseEnvFilesPath}/.env.dev`,
  test: `${baseEnvFilesPath}/.env.test`,
  prod: `${baseEnvFilesPath}/.env.prod`,
};
config({ path: envFilesPath[NODE_ENV] });

const {
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  DB_HOST,
} = process.env;
export default {
  type: "postgres",
  host: DB_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  migrations: ["./src/database/migrations/**.{js,ts}"],
  entities: ["./src/models/**.{js,ts}"],
  logging: false,
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
