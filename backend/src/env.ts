import { configDotenv } from "dotenv";

configDotenv();

if (!process.env.AUTH_SECRET) throw new Error('AUTH_SECRET is not specified in .env file');

export const env = {
  SALT_ROUNDS: Number.parseInt(process.env.SALT_ROUNDS || '10'),
  AUTH_SECRET: process.env.AUTH_SECRET,
  SERVER_PORT: Number.parseInt(process.env.SERVER_PORT || '9999'),
  XRAY_API_URL: process.env.XRAY_API_URL,
  MRI_API_URL: process.env.MRI_API_URL,
  HEART_DESEASE_API_URL: process.env.HEART_DESEASE_API_URL
}
