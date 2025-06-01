import prisma from "../../utils/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginUser = async (payload: { email: string; password: string }) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!isUserExist) {
    throw new Error(`User not found on this ${payload.email}`);
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new Error(`Password did not matched.`);
  }

  const tokenInfo = {
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = jwt.sign(tokenInfo, "arif@210505", {
    algorithm: "HS256",
    expiresIn: "15m",
  });

  return accessToken;
};

export const AuthServices = { loginUser };
