import { theme } from "antd";

export const DEFAULT_THEME = {
  token: {
    colorPrimary: "#13c2c2",
    colorInfo: "#13c2c2",
    colorLink: "#722ed1",
    wireframe: false
  },
  algorithm: theme.defaultAlgorithm,
};
export const APP_NAME = "Medorg App";
export const ORGANIZATION_NAME = "TMU Students Group"

export enum Permission {
  viewPermissionGroups = 'viewPermissionGroups',
  editPermissionGroups = 'editPermissionGroups',
  viewPermissions = 'viewPermissions',
  editPermissions = 'editPermissions',
  viewUsers = 'viewUsers',
  editUsers = 'editUsers',
  useXrayAnalysis = 'useXrayAnalysis',
  viewAppointments = 'viewAppointments',
  editAppointments = 'editAppointments',
  viewDoctorsAppointments = 'viewDoctorsAppointments',
}