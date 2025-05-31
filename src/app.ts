import express, { Application, Request, Response } from "express";
const app: Application = express();

import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.route";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", UserRoutes);

app.get("/", async (req: Request, res: Response) => {
  res.send({
    message: "Server is running",
  });
});

export default app;
