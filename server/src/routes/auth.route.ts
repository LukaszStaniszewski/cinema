import { Router } from "express";

import { authenticate, autoLogin, logout } from "../controllers/auth.controller";
import deserialaizeUser from "../middleware/deserialaizeUser";

const userRouter = Router();

userRouter.post("/", authenticate);
userRouter.get("/", deserialaizeUser, autoLogin);
userRouter.get("/logout", deserialaizeUser, logout);

export default userRouter;
