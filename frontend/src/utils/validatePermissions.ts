import {getMyPermissions} from "../api/users/getMyPermissions";
import {Permission} from "../constants";

export const validatePermissions = async (requiredPermissions: Permission[]) => {
  const usersPermissions = await getMyPermissions()
  return requiredPermissions.every((permission) => usersPermissions.includes(permission));
}

export const createValidatePermissionsLoader = (requiredPermissions: Permission[]) => (
  async () => {
    const haveRequiredPermissions = await validatePermissions(requiredPermissions);
    if (!haveRequiredPermissions) {
      throw new Response("Forbidden", { status: 403 });
    }
    return null;
  }
)