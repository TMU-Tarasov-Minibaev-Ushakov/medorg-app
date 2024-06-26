import {client} from "../client";
import {User} from "../../types";

export const getUserById = async (id: number) => {
  return await client
    .get<User>("/users/" + id)
    .then((res) => res.data);
}