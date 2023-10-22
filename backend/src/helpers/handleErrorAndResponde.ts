import { Response } from "express";
import { parseError } from "./errorParsers/parseError";

export function handleErrorAndRespond(error: any, res: Response) {

  console.log(error);

  const parsedError = parseError(error);
  if (parsedError) return res.status(parsedError.status).json({
    error: parsedError
  });

  return res.status(500).json({
    error: {
      status: 500,
      message: 'Something went wrong'
    }
  })
}