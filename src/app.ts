import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();

import cors from "cors";
import router from "./app/routes";
import status from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundRoute from "./app/middlewares/notFoundRoute";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/", async (req: Request, res: Response) => {
  res.send({
    message: "Server is running",
  });
});

app.use(globalErrorHandler);

app.use(notFoundRoute);

export default app;
