import React from "react";
import {CloudOutlined, CalendarOutlined, MessageOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons";
import {Permission} from "../../../../constants";


export const menuItems = [
    // {
    //     key: '/',
    //     icon: React.createElement(HomeOutlined),
    //     label: 'Home',
    // },
    {
        key: '/x-ray',
        icon: React.createElement(CloudOutlined),
        label: 'X-Ray analysis',
        permissions: []
    },
    {
        key: '/appointments',
        icon: React.createElement(CalendarOutlined),
        label: 'Appointments',
        permissions: []
    },
    {
        key: '/messages',
        icon: React.createElement(MessageOutlined),
        label: 'Messages',
        permissions: []
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
    }
    // {
    //     key: '/mre',
    //     icon: React.createElement(CloudOutlined),
    //     label: 'MRE analysis'
    // }
]