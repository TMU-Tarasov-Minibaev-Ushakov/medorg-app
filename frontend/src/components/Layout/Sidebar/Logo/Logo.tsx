import { Typography } from 'antd';
import {APP_NAME} from "../../../../constants";
import styled from "styled-components";

const { Text } = Typography;

const StyledLogo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${ ({theme}) => theme.paddingSM }px;
`

export const Logo = () => {
    return (
        <StyledLogo>
            <Text style={{ fontSize: 24, fontWeight: 600 }}>{APP_NAME}</Text>
        </StyledLogo>
    );
}