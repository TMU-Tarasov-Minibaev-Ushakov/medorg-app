import { GlobalToken } from "antd";

export type PropsWithThemeToken = {$theme: GlobalToken}
export enum UserType {
    PATIENT = 'PATIENT',
    DOCTOR = 'DOCTOR',
    ADMIN = 'ADMIN'
}

export type User = {
    id: number,
    name: string,
    email: string,
    type: UserType,
    permissions?: string[],
    permissionGroups?: { name: string, permissions: string[] }[]
}

declare module 'styled-components' {
    export interface DefaultTheme extends GlobalToken {}
}