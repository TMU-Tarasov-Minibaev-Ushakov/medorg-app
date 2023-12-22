import { configDotenv } from "dotenv";

configDotenv();

if (!process.env.AUTH_SECRET) throw new Error('AUTH_SECRET is not specified in .env file');
if (!process.env.ML_API_URL) throw new Error('ML_API_URL is not specified in .env file')

export const env = {
  SALT_ROUNDS: Number.parseInt(process.env.SALT_ROUNDS || '10'),
  AUTH_SECRET: process.env.AUTH_SECRET,
  SERVER_PORT: Number.parseInt(process.env.SERVER_PORT || '9999'),
  ML_API_URL: process.env.ML_API_URL
}
