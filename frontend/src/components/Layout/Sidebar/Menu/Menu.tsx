import React, {useCallback} from "react";
import {MenuProps} from "antd";

import {menuItems} from "./constants";
import {useNavigate} from "react-router-dom";
import {StyledMenu} from "./StyledMenu";

type MenuItem = Required<MenuProps>['items'][number];

export const Menu: React.FC = () => {

    const navigate = useNavigate();

    const onSelect = useCallback((item: MenuItem) => {
        const linkToNavigate = item?.key as string ?? '/';
        navigate(linkToNavigate);
    }, [navigate]);

    return (
        <StyledMenu mode="inline" items={menuItems} onSelect={onSelect} style={{borderInlineEnd: 'none'}}/>
    )
}