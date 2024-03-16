import {client} from "../client";
import {UserType} from "../../types";

type UserInfoResponse = {
  id: number,
  email: string,
  type: UserType
}

export const getMyUserInfo = async () => {
  return await client
    .get<UserInfoResponse>("/users/my-user")
    .then((res) => res.data);
}