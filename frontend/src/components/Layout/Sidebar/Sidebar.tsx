import {Menu} from "./Menu/Menu";
import {StyledSidebar} from "./StyledSidebar";
import React, {useState} from "react";
import {Logo} from "./Logo/Logo";
import {SimpleDivider} from "../../SimpleDivider";
import {useUserInfo} from "../../../contexts/UserInfoContext";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {userInfo} = useUserInfo();
  return (
    <StyledSidebar collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Logo/>
      <SimpleDivider/>
      <Menu/>
      <SimpleDivider/>
      {userInfo
        ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {userInfo.email}
          </div>
        : null}
    </StyledSidebar>
  )
}