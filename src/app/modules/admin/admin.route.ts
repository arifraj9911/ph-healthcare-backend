import { NextFunction, Request, Response, Router } from "express";
import { AdminController } from "./admin.controller";
import { AnyZodObject, z } from "zod";
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidationSchema } from "./admin.validation";

const router = Router();

router.get("/", AdminController.getAllAdmin);
router.get("/:id", AdminController.getSingleAdmin);
router.patch(
  "/update/:id",
  validateRequest(AdminValidationSchema.updateSchema),
  AdminController.updateAdmin
);
router.delete("/delete/:id", AdminController.deleteAdmin);
router.delete("/soft/delete/:id", AdminController.softDeleteAdmin);

export const AdminRoutes = router;
