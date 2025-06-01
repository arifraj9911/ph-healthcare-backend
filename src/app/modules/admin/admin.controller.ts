import { NextFunction, Request, Response } from "express";
import { AdminServices } from "./admin.service";
import pick from "../../utils/pick";
import {
  filterableFields,
  paginationAndSortingOptions,
} from "./admin.constant";
import sendResponse from "../../utils/sendResponse";
import { status } from "http-status";

const getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filterData = pick(req.query, filterableFields);

    const options = pick(req.query, paginationAndSortingOptions);

    const result = await AdminServices.getAllAdmin(filterData, options);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin Retrive Successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error: any) {
    next(error);
  }
};

const getSingleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AdminServices.getSingleAdmin(req.params.id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin Retrive Successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminServices.updateAdmin(req.params.id, req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Update Admin Successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminServices.deleteAdmin(req.params.id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Delete Admin Successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const softDeleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AdminServices.softDelete(req.params.id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Soft Delete Admin Successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
