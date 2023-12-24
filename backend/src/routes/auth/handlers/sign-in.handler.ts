import { Request, Response } from "express";
import { getUserByEmail } from "../../../db/user/getUserByEmail";
import { compareSync } from "bcrypt";
import { generateToken } from "../helpers";
import { handleErrorAndRespond } from "../../../helpers/handleErrorAndResponde";

export async function signInHandler(req: Request, res: Response) {
  try {
    const email = req.body.email as string;
    const password = req.body.password as string;

    const user = await getUserByEmail(email);
    const isPasswordValid = compareSync(password, user?.passwordHash || "");

    if (!user || !isPasswordValid)
      return res.status(400).json({
        error: {
          status: 400,
          message: "Incorrect email or password",
        },
      });

    res.json({
      token: generateToken(user),
    });
  } catch (error) {
    handleErrorAndRespond(error, res);
  }
}
