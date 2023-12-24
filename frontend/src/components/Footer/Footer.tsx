import React from 'react'
import { APP_NAME, ORGANIZATION_NAME } from '../../constants'
import {Flex, Layout} from 'antd'
import styled from "styled-components";

const StyledFooter = styled(Layout.Footer) `
    background: ${({ theme }) => theme.colorBgBase};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
`;

export const Footer = () => {
  return (
    <StyledFooter>{`"${APP_NAME}" ©2023 Created by "${ORGANIZATION_NAME}"`}</StyledFooter>
  )
}
