import {useEffect, useState} from "react";
import {MenuItemType} from "antd/es/menu/hooks/useItems";
import {filterMenuItemsByPermissions} from "./helpers";
import {menuItems} from "./constants";

export const useFilteredMenuItems = () => {
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItemType[]>();
  useEffect(() => {
    filterMenuItemsByPermissions(menuItems).then(setFilteredMenuItems);
  }, []);

  return filteredMenuItems
};