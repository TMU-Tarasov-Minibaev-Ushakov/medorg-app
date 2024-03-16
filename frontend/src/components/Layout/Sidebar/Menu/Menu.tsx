import React, {useCallback} from "react";
import {MenuProps} from "antd";

import {useNavigate} from "react-router-dom";
import {StyledMenu} from "./StyledMenu";
import {useFilteredMenuItems} from "./hooks";

type MenuItem = Required<MenuProps>['items'][number];

export const Menu: React.FC = () => {

    const navigate = useNavigate();

    const onSelect = useCallback((item: MenuItem) => {
        const linkToNavigate = item?.key as string ?? '/';
        navigate(linkToNavigate);
    }, [navigate]);

    const filteredMenuItems = useFilteredMenuItems();

    return (
        <StyledMenu mode="inline" items={filteredMenuItems} onSelect={onSelect} style={{borderInlineEnd: 'none'}}/>
    )
}