import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";

type FieldType = {
  login?: string;
  password?: string;
  remember?: string;
};

const App: React.FC = () => {
  const notify = (text: string, type: "success" | "error") => toast[type](text);
  const token = localStorage.getItem("auth");
  const [user, setUser] = useState<{ login?: string }>({});
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    delete values.remember;
    fetch(import.meta.env.VITE_APP_URL + "/user/update", {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          notify("Muvaffaqqiyatli saqlandi", "success");
        } else if (typeof data.detail == "string") {
          notify(data.detail, "error");
        }
      });
  };
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
      });
  }, [token]);
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {
    notify("Xatolik yuz berdi", "error");
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Login"
        name="login"
        rules={[{ required: true, message: "Iltimos loginingizni yozing!" }]}
      >
        <Input defaultValue={user?.login} />
      </Form.Item>

      <Form.Item
        name="password"
        label="Parol"
        rules={[
          {
            required: true,
            message: "Iltimos parolingizni yozing!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Parolni tasdiqlang"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Iltimos parolingizni tasdiqlang!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Siz kiritgan yangi parol mos emas!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Yangilash
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
