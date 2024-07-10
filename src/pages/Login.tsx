import React, { useState } from "react";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Alert, Button, Flex, Form, Input, Space } from "antd";

const App: React.FC = () => {
  const [error, setError] = useState("");
  const onFinish = (values: any) => {
    setError("");
    fetch(import.meta.env.VITE_APP_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          localStorage.setItem("auth", data.result.access_token);
          location = data.result.role;
        }
        if (data.detail) {
          setError(data.detail);
        }
      })
      .catch((e) => {
        if (e.message === "Failed to fetch") {
          setError("Nimadir xato ketdi!");
        }
      });
  };

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        {error && (
          <Space direction="vertical" style={{ width: "100%" }}>
            <Alert message={error} type="error" showIcon closable />
          </Space>
        )}
        <br />
        <br />
        <Form.Item
          name="login"
          rules={[
            {
              required: true,
              message: "Iltimos loginni kiriting!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Usernameni kiriting"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Iltimos parolni kiriting!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Parolni kiriting"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Tizimga kirish
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default App;
