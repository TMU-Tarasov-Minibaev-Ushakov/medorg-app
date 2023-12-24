import {GlobalToken, Layout, theme} from "antd";
import styled from "styled-components";
import {PropsWithThemeToken} from "../../types";

export const StyledLayout = styled(Layout)`
    min-height: 100vh;
    background: ${({ theme }) => theme.colorBgLayout};
`;