import { Router } from "express";

import { authenticate, autoLogin } from "../controllers/auth.controller";
import deserialaizeUser from "../middleware/deserialaizeUser";
import requireUser from "../middleware/requireUser";

const userRouter = Router();

// userRouter.post("/register", registerAndSignIn);
// userRouter.post("/delete", requireUser, deleteUserOrUsers);
// userRouter.patch("/", requireUser, updateUserOrUsers);
userRouter.post("/", authenticate);
userRouter.get("/", deserialaizeUser, autoLogin);
// userRouter.get("/current", requireUser, getCurrentUser);

export default userRouter;
