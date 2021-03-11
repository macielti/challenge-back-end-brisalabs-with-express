import { Router } from "express";
import { celebrate, Joi, errors, Segments } from "celebrate";
import { PIXKeyController } from "../controllers";

const routes = Router();

const pixKeyController = new PIXKeyController();

routes.post(
  "/pixKey",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      cpf: Joi.string().required(),
      key: Joi.string().required(),
    }),
  }),
  pixKeyController.create
);

routes.use(errors());

export default routes;
