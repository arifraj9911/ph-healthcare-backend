import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.createAdmin(req.body);
    res.status(200).send({
      success: true,
      messsage: "Admin Created Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error?.message || "Something went wrong!",
      error,
    });
  }
};

export const UserController = {
  createAdmin,
};
