import axios from "axios";
import { env } from "../env";

function getAuthorizationHeader() {
  const token = localStorage.getItem("authToken");
  return token ?? ''
}

export const client = axios.create({
  baseURL: env.BACKEND_URL,
  validateStatus: (status) => {
    return status < 500;
  },
  headers: {
    authorization: getAuthorizationHeader(),
  }
});