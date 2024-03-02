import {client} from "../client";

export const getUserById = async (id: number) => {
  return await client
    .get<any>("/users/" + id)
    .then((res) => res.data);
}