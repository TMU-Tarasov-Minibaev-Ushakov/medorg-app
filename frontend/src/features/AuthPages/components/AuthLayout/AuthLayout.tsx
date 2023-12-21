import React, { FC, PropsWithChildren } from "react";

import { Footer } from "../../../../components/Footer/Footer";

import { StyledAuthLayoutContainer } from "./StyledAuthLayoutContainer";
import { StyledAuthContentContainer } from "./StyledAuthContentContainer";
import { theme } from "antd";

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {

  const { token: themeToken } = theme.useToken();

  return (
    <StyledAuthLayoutContainer $theme={themeToken}>
      <StyledAuthContentContainer>
        {children}
      </StyledAuthContentContainer>
      <Footer />
    </StyledAuthLayoutContainer>
  );
};
