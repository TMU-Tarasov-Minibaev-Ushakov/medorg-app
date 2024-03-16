import React from "react";
import {
    CloudOutlined,
    CalendarOutlined,
    MessageOutlined,
    UserAddOutlined,
    UserOutlined,
    LogoutOutlined
} from "@ant-design/icons";
import {MenuItemType} from "antd/es/menu/hooks/useItems";
import {Permission} from "../../../../constants";

export type MenuItemWithPermissions = MenuItemType & {
    permissions?: Permission[]
}
export const menuItems: MenuItemWithPermissions[] = [
    {
        key: '/x-ray',
        icon: React.createElement(CloudOutlined),
        label: 'X-Ray analysis',
        permissions: [Permission.useXrayAnalysis]
    },
    {
        key: '/appointments',
        icon: React.createElement(CalendarOutlined),
        label: 'Appointments',
    },
    {
        key: '/messages',
        icon: React.createElement(MessageOutlined),
        label: 'Messages',
    },
    {
        key: '/users/create-doctor',
        icon: React.createElement(UserAddOutlined),
        label: 'Create doctor',
        permissions: [Permission.editUsers]
    },
    {
        key: '/users',
        icon: React.createElement(UserOutlined),
        label: 'Users',
        permissions: [Permission.viewUsers]
    },
    {
        key: '/sign-in',
        icon: React.createElement(LogoutOutlined),
        label: 'Sign out'
    }
]

