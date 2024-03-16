import {client} from "../client";
import {Permission} from "../../constants";

export const getMyPermissions = async () => {
  return await client
    .get<Permission[]>("/users/my-permissions")
    .then((res) => res.data);
}