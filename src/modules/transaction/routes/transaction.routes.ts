import { Router } from "express";
import { TransactionController } from "../controllers";
import { celebrate, Joi, errors, Segments } from "celebrate";

const routes = Router();

const transactionController = new TransactionController();

routes.post(
  "/transaction",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      pix_key_from: Joi.string().required(),
      pix_key_to: Joi.string().required(),
      value: Joi.number().sign("positive").required(),
    }),
  }),
  transactionController.create
);

routes.use(errors());

export { routes as transactionRoutes };
