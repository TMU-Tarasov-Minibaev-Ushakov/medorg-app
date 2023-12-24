import {Menu} from "./Menu/Menu";
import {StyledSidebar} from "./StyledSidebar";
import React, {useState} from "react";
import {Logo} from "./Logo/Logo";
import {SimpleDivider} from "../../SimpleDivider";

export const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <StyledSidebar collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Logo />
            <SimpleDivider/>
            <Menu />
        </StyledSidebar>
    )
}