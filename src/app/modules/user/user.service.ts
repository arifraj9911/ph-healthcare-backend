import { UserRole } from "../../../../generated/prisma";
import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";

const createAdmin = async (payload: any) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);
  const userData = {
    email: payload?.admin?.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const adminData = await transactionClient.admin.create({
      data: payload.admin,
    });

    return adminData;
  });

  return result;
};

export const UserServices = {
  createAdmin,
};
