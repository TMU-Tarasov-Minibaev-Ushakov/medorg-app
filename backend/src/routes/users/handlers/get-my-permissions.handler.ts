import { Request, Response } from "express";
import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";
import {getUser} from "../../../db/user";
import {flatPermissions} from "../../../helpers/flatPermissions";

export const getMyPermissionsHandler = async (req: Request, res: Response) => {
  console.log('getMyPermissionsHandler');
  try {
    console.log('User: ' + req.user)
    const user = await getUser(req.user!.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(flatPermissions(user.permissionGroups, user.permissions));
  } catch (error) {
    handleErrorAndRespond(error, res);
  }
};