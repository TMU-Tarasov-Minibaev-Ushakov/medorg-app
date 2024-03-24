import { GlobalToken } from "antd";

export type PropsWithThemeToken = {$theme: GlobalToken}
export enum UserType {
    PATIENT = 'PATIENT',
    DOCTOR = 'DOCTOR',
    ADMIN = 'ADMIN'
}

export type User = {
    id: number,
    email: string,
    type: UserType
}

declare module 'styled-components' {
    export interface DefaultTheme extends GlobalToken {}
}