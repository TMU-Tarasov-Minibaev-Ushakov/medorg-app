import {NextFunction, Request, Response} from "express";
import {getUser} from "../db/user";
import {PermissionName} from "../constants";
import {flatPermissions} from "./flatPermissions";

export function createPermissionsValidator(permissions: PermissionName[]) {
  
  return async (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.user) return res.status(403).json({
      message: 'User is not authenticated'
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