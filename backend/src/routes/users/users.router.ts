import {Router} from "express";
import {checkAuth} from "../../helpers/checkAuth";
import {createPermissionsValidator} from "../../helpers/createPermissionsValidator";
import {PermissionName} from "../../constants";
import {getUsersHandler} from "./handlers/get-users.handler";
import {getUserHandler} from "./handlers/get-user.handler";
import {getMyPermissionsHandler} from "./handlers/get-my-permissions.handler";
import {getDoctorsHandler} from "./handlers/get-doctors.handler";

export const usersRouter = Router();

usersRouter.get(
  '/doctors',
  checkAuth,
  getDoctorsHandler
)

usersRouter.get(
  '/',
  checkAuth,
  createPermissionsValidator([PermissionName.viewUsers]),
  getUsersHandler
);

usersRouter.get(
  '/my-permissions',
  checkAuth,
  getMyPermissionsHandler
);

usersRouter.get(
  '/:id',
  checkAuth,
  createPermissionsValidator([PermissionName.viewUsers]),
  getUserHandler
);