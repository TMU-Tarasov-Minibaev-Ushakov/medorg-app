import { Axios } from "axios";
import { env } from "../env";

export const client = new Axios({
  baseURL: env.BACKEND_URL
});