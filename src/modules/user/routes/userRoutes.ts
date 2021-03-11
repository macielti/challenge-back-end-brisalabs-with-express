import { Router } from "express";
import { UserController } from "../controllers";
import { celebrate, Joi, errors, Segments } from "celebrate";
import validator from "cpf-cnpj-validator";

const JoiExtended = Joi.extend(validator);

const router = Router();

const userController = new UserController();

router.post(
  "/users",
  celebrate({
    [Segments.BODY]: JoiExtended.object().keys({
      name: JoiExtended.string().required(),
      cpf: JoiExtended.document().cpf().required(),
      balance: JoiExtended.number().sign("positive").required(),
    }),
  }),
  userController.create
);
router.use(errors());

router.get("/users/:cpf", userController.show);

export default router;
