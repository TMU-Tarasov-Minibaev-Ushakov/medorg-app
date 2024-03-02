import {client} from "../client";

export const getMyPermissions = async () => {
  return await client
    .get<string[]>("/users/my-permissions")
    .then((res) => res.data);
}