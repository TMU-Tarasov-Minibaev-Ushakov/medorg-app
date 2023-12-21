import axios from "axios";
import { env } from "../env";

export const client = axios.create({
  baseURL: env.BACKEND_URL,
  validateStatus: (status) => {
    return status < 500;
  },
});