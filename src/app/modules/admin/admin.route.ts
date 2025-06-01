import { Router } from "express";
import { AdminController } from "./admin.controller";

const router = Router();

router.get("/",AdminController.getAllAdmin)
router.get("/:id",AdminController.getSingleAdmin)
router.patch("/update/:id",AdminController.updateAdmin)
router.delete("/delete/:id",AdminController.deleteAdmin)
router.delete("/soft/delete/:id",AdminController.softDeleteAdmin)

export const AdminRoutes = router;
