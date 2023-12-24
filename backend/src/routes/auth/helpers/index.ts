import { User } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { env } from "../../../env";
import { UserFromJWT } from "../../../types";

export function generateToken(user: User) {
  return sign(
    {
      id: user.id,
      email: user.email,
    },
    env.AUTH_SECRET
  );
}

export function verifyToken(token: string) {
  return verify(token, env.AUTH_SECRET) as UserFromJWT;
}

export function generatePasswordHash(password: string) {
  const salt = genSaltSync(env.SALT_ROUNDS);
  return hashSync(password, salt);
}
