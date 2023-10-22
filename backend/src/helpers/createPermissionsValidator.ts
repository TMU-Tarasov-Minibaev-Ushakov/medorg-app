import { NextFunction, Request, Response } from "express";
import { getUser } from "../db/user";
import { Permission } from "@prisma/client";

export function createPermissionsValidator(permissions: string[]) {
  
  return async (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.user) return res.status(403).json({
      message: 'Please log in to see this page'
    })

    const { id } = req.user;
     
    const user = await getUser(id);
    const permissionNames = flatPermissions(user?.permissionGroups, user?.permissions);

    if (!permissions.some(p => permissionNames.includes(p))) {
      return res.status(403).json({
        message: 'You don\'t have enough permissions'
      })
    }

    next();
  }

}

type PermissionGroupWithPermissions = {
  name: string,
  permissions: {
      name: string;
  }[]
}

function flatPermissions(permissionGroups: PermissionGroupWithPermissions[] = [], permissions: Permission[] = []) {
  const permissionNamesFromGroups = permissionGroups.map(g => g.permissions).flat().map(p => p.name);
  const permissionNames = permissions.map(p => p.name);
  const allPermissionNames = [...new Set([...permissionNamesFromGroups, ...permissionNames])];
  return allPermissionNames;
}