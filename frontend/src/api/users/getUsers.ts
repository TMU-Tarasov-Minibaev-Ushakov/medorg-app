import {client} from "../client";
import {User} from "../../types";

export const getUsers = async () => {
  return await client
    .get<User[]>("/users")
    .then((res) => res.data);
}