import {Router} from "express";
import {checkAuth} from "../../helpers/checkAuth";
import {createPermissionsValidator} from "../../helpers/createPermissionsValidator";
import {PermissionName} from "../../constants";
import {getUsersHandler} from "./handlers/get-users.handler";
import {getUserHandler} from "./handlers/get-user.handler";
import {getMyPermissionsHandler} from "./handlers/get-my-permissions.handler";
import {getDoctorsHandler} from "./handlers/get-doctors.handler";
import {getMyUserInfoHandler} from "./handlers/get-my-user-info";
import {getDoctorByUserIdHandler} from "./handlers/get-doctor-by-user-id.handler";

export const usersRouter = Router();

usersRouter.get(
  '/doctors',
  checkAuth,
  getDoctorsHandler
)

usersRouter.get(
  '/doctor-by-user-id/:userId',
  checkAuth,
  getDoctorByUserIdHandler
)

usersRouter.get(
  '/',
  checkAuth,
  getUsersHandler
);

usersRouter.get(
  '/my-user',
  checkAuth,
  getMyUserInfoHandler
)

usersRouter.get(
  '/my-permissions',
  checkAuth,
  getMyPermissionsHandler
);

usersRouter.get(
  '/:id',
  checkAuth,
  getUserHandler
);