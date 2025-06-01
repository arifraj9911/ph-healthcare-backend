import { Admin, Prisma, UserStatus } from "../../../../generated/prisma";
import { paginationHelper } from "../../helper/paginationHelper";
import prisma from "../../utils/prisma";
import { adminSearchAbleField } from "./admin.constant";

const getAllAdmin = async (params: any, options: any) => {
  const { searchTerm, ...filterData } = params;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const andCondition: Prisma.AdminWhereInput[] = [];

  //   for search
  if (params?.searchTerm) {
    andCondition.push({
      OR: adminSearchAbleField.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  //   for filter
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  andCondition.push({
    isDeleted: false,
  });

  const whereCondition: Prisma.AdminWhereInput = { AND: andCondition };

  const total = await prisma.admin.count({
    where: whereCondition,
  });
  const result = await prisma.admin.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted:false
    },
  });

  if (!result) {
    throw new Error("Admin not found of following id!");
  }

  return result;
};

const updateAdmin = async (id: string, data: Partial<Admin>) => {
  const adminData = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted:false
    },
  });

  if (!adminData) {
    throw new Error("Admin not found of following id!");
  }

  const updateAdmin = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });

  return updateAdmin;
};

const deleteAdmin = async (id: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const adminData = await transactionClient.admin.delete({
      where: {
        id,
      },
    });

    await transactionClient.user.delete({
      where: {
        email: adminData.email,
      },
    });

    return adminData;
  });

  return result;
};

const softDelete = async (id: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeleted = await transactionClient.admin.update({
      where: {
        id,
        isDeleted:false
      },
      data: {
        isDeleted: true,
      },
    });

    await transactionClient.user.update({
      where: {
        email: adminDeleted.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return adminDeleted;
  });

  return result;
};

export const AdminServices = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  softDelete,
};
