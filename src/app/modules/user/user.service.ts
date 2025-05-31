import { PrismaClient, UserRole } from "../../../../generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createAdmin = async (payload: any) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);
  const userData = {
    email: payload?.admin?.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createUserData = await transactionClient.user.create({
      data: userData,
    });

    const createAdminData = await transactionClient.admin.create({
      data: payload.admin,
    });

    console.log("user", createUserData);
    console.log("admin", createAdminData);
  });

  return result;
};

export const UserServices = {
  createAdmin,
};
