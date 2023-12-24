import { GlobalToken } from "antd";

export type PropsWithThemeToken = {$theme: GlobalToken}

declare module 'styled-components' {
    export interface DefaultTheme extends GlobalToken {}
}