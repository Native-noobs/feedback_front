import { useState } from "react";

import { Flex, Layout, Menu } from "antd";

import { Outlet, useNavigate } from "react-router-dom";
import ProfileAvatar from "../components/ProfileAvatar.tsx";

const { Sider } = Layout;

function getItem(label: string, key: string) {
    return {
        key,
        label,
    };
}

const RootLayout = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const items = [
        getItem("Header", "header"),
        getItem("Form", "form"),
        getItem("Feedback", "feedback"),
        getItem("Log In", "login"),
    ];

    return (
        <Layout hasSider>
            <Sider
                breakpoint="lg"
                collapsible
                collapsed={collapsed}
                theme="light"
                onCollapse={(value) => setCollapsed(value)}
                style={{
                    minHeight: "100vh",
                }}
            >
                <Flex
                    justify="center"
                    style={{ height: "50px", margin: "20px 20px" }}
                >
                    <ProfileAvatar />
                </Flex>
                <Menu
                    mode="inline"
                    items={items}
                    onClick={(e) => {
                        navigate(e.key);
                    }}
                />
            </Sider>
            <Layout>
                <Outlet />
            </Layout>
        </Layout>
    );
};
export default RootLayout;
