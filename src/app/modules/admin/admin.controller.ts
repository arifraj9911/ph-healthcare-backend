import { AdminServices } from "./admin.service";
import pick from "../../utils/pick";
import {
  filterableFields,
  paginationAndSortingOptions,
} from "./admin.constant";
import sendResponse from "../../utils/sendResponse";
import { status } from "http-status";
import catchAsync from "../../utils/catchAsync";

const getAllAdmin = catchAsync(async (req, res) => {
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
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.getSingleAdmin(req.params.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin Retrive Successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.updateAdmin(req.params.id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Update Admin Successfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.deleteAdmin(req.params.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Delete Admin Successfully",
    data: result,
  });
});

const softDeleteAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.softDelete(req.params.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Soft Delete Admin Successfully",
    data: result,
  });
});

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
