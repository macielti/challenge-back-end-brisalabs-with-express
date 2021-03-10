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
} = process.env;
export default {
  type: "postgres",
  host: "localhost",
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  migrations: ["./src/database/migrations/**.ts"],
  entities: ["./src/models/**.ts"],
  logging: false,
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
