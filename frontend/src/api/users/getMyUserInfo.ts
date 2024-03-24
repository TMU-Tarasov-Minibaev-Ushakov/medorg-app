import {client} from "../client";
import {User, UserType} from "../../types";

export const getMyUserInfo = async () => {
  return await client
    .get<User>("/users/my-user")
    .then((res) => res.data);
}