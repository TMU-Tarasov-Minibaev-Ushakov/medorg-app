import { configDotenv } from "dotenv";

configDotenv();

export const env = {
  BACKEND_URL: process.env.BACKEND_URL || "http://localhost:9999",
}
