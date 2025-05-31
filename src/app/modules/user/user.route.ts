import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.use("/create",UserController.createAdmin)

export const UserRoutes = router;
