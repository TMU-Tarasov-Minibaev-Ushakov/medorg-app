import { GlobalToken } from "antd";

export type PropsWithThemeToken = {$theme: GlobalToken}
export enum UserType {
    PATIENT = 'PATIENT',
    DOCTOR = 'DOCTOR',
    ADMIN = 'ADMIN'
}

declare module 'styled-components' {
    export interface DefaultTheme extends GlobalToken {}
}