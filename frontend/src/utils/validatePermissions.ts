import {getMyPermissions} from "../api/users/getMyPermissions";
import {Permission} from "../constants";

export const validatePermissions = async (requiredPermissions: Permission[]) => {
  const userPermissions = await getMyPermissions()
  return requiredPermissions.every((permission) => userPermissions?.includes(permission));
}

export const validatePermissionsSync = (requiredPermissions: Permission[], userPermissions: Permission[]) => {
  return requiredPermissions.every((permission) => userPermissions?.includes(permission));
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