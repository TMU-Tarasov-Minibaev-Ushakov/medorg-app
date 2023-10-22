import { User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      user?: UserFromJWT;
    }
  }
}

export type RegistrationData = {
  email: string,
  password: string
}

export type UserFromJWT = {
  id: number,
  email: string
}

export enum PermissionName {
  editPermissionGroups = 'editPermissionGroups',
  editPermissions = 'editPermissions',
  editUsers = 'editUsers',
  viewPermissionGroups = 'viewPermissionGroups',
  viewPermissions = 'viewPermissions',
  viewUsers = 'viewUsers'
}