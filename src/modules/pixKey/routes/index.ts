import { Router } from "express";
import pixKeysRoutes from "./pixKeys.routes";

const routes = Router();

routes.use(pixKeysRoutes);

export { routes as pixKeyRouter };
