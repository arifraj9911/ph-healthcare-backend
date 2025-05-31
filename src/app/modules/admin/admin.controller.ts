import { Request, Response } from "express";
import { AdminServices } from "./admin.service";
import pick from "../../utils/pick";
import {
  filterableFields,
  paginationAndSortingOptions,
} from "./admin.constant";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const filterData = pick(req.query, filterableFields);

    const options = pick(req.query, paginationAndSortingOptions);

    const result = await AdminServices.getAllAdmin(filterData, options);
    res.status(200).send({
      success: true,
      messsage: "Admin Retrive Successfully",
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

export const AdminController = {
  getAllAdmin,
};
