import React from "react";
import {CloudOutlined, HomeOutlined} from "@ant-design/icons";


export const menuItems = [
    {
        key: '/',
        icon: React.createElement(HomeOutlined),
        label: 'Home',
    },
    {
        key: '/x-ray',
        icon: React.createElement(CloudOutlined),
        label: 'X-Ray analysis'
    },
    // {
    //     key: '/mre',
    //     icon: React.createElement(CloudOutlined),
    //     label: 'MRE analysis'
    // }
]