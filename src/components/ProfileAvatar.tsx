import React from "react";
import { Avatar, Space } from "antd";

const ProfileAvatar: React.FC = () => {
    return (
        <Space>
            <Avatar
                style={{
                    backgroundColor: "red",
                    verticalAlign: "middle",
                }}
                size="large"
                gap={3}
            >
                D
            </Avatar>
        </Space>
    );
};

export default ProfileAvatar;
