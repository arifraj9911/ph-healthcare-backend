import express, { Application, Request, Response } from "express";
const app: Application = express();

import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.route";
import { AdminRoutes } from "./app/modules/admin/admin.route";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/admin", AdminRoutes);

app.get("/", async (req: Request, res: Response) => {
  res.send({
    message: "Server is running",
  });
});

export default app;
