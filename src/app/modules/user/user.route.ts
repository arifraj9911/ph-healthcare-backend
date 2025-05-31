import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/create",UserController.createAdmin)

export const UserRoutes = router;
