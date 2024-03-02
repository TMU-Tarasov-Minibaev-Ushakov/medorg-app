import {getMyPermissions} from "../api/users/getMyPermissions";
import {Permission} from "../constants";

export const validatePermissions = async (requiredPermissions: Permission[]) => {
  const usersPermissions = await getMyPermissions()
  console.log(usersPermissions)
  console.log(requiredPermissions)
  console.log(requiredPermissions.every((permission) => usersPermissions.includes(permission)))
  return requiredPermissions.every((permission) => usersPermissions.includes(permission));
}