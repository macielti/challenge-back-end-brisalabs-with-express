import "dotenv/config";
import { app } from "./app";
import { logger } from "./utils";

const { API_PORT } = process.env;

const bootAPI = () => logger.info(`Running Server on port ${API_PORT}`);
app.listen(API_PORT, bootAPI);
