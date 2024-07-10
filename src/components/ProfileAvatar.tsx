import React, { useEffect, useState } from "react";
import { Avatar, Space } from "antd";

const ProfileAvatar: React.FC = () => {
  const token = localStorage.getItem("auth");
  const [user, setUser] = useState<any>();
  useEffect(() => {
    fetch(import.meta.env.VITE_APP_URL + "/user/get-me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.result);
        console.log(data);
      });
  }, [token]);
  return (
    <Space>
      <Avatar
        size={50}
        src={
          <img
            src={
              import.meta.env.VITE_APP_URL + "/user/files/" + user?.company_logo
            }
            alt=""
          />
        }
      />
    </Space>
  );
};

export default ProfileAvatar;
