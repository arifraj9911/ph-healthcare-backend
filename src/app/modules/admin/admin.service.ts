import { Prisma } from "../../../../generated/prisma";
import { paginationHelper } from "../../helper/paginationHelper";
import prisma from "../../utils/prisma";
import { adminSearchAbleField } from "./admin.constant";



const getAllAdmin = async (params: any, options: any) => {
  const { searchTerm, ...filterData } = params;
  const { limit, skip, sortBy, sortOrder } =
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

  const whereCondition: Prisma.AdminWhereInput = { AND: andCondition };

  const result = await prisma.admin.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
  });

  return result;
};

export const AdminServices = {
  getAllAdmin,
};
