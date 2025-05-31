import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  const result = await UserServices.createAdmin(req.body);
  res.send({
    messsage: "admin created",
    result,
  });
};

export const UserController = {
  createAdmin,
};
