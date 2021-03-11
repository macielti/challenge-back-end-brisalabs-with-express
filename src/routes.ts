import { Router } from "express";

import { userRouter } from "./modules/user/routes";
import { pixKeyRouter } from "./modules/pixKey/routes";
import { transactionRouter } from "./modules/transaction/routes";

const router = Router();

router.use(userRouter);
router.use(pixKeyRouter);
router.use(transactionRouter);

export default router;
