import React, {FC, PropsWithChildren} from "react";
import { Layout as AntdLayout } from "antd";
import {Outlet} from "react-router-dom";

import {StyledLayout} from "./StyledLayout";
import {Sidebar} from "./Sidebar/Sidebar";
import {Footer} from "../Footer/Footer";
import {StyledContent} from "./StyledContent";

export const Layout = () => {

    return (
        <StyledLayout hasSider>
            <Sidebar />
            <AntdLayout>
                <StyledContent>
                    <div style={{flexGrow: 1, maxWidth: 1000}}>
                        <Outlet />
                    </div>
                </StyledContent>
                <Footer />
            </AntdLayout>
        </StyledLayout>
    )
}