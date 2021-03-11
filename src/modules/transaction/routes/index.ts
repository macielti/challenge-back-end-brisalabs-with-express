import { Router } from "express";
import { transactionRoutes } from "./transaction.routes";

const routes = Router();

routes.use(transactionRoutes);

export { routes as transactionRouter };
