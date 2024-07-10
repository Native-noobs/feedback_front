import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Image, Input, theme, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Content } from "antd/es/layout/layout";
import { toast } from "react-toastify";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const App: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const notify = (text: string, type: "success" | "error") => toast[type](text);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const token = localStorage.getItem("auth");
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Yuklang</div>
    </button>
  );

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [company, setCompany] = useState("");

  const saveInfo = () => {
    fetch(import.meta.env.VITE_APP_URL + "/user/update_company", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        company_name: company,
        company_logo: fileList[0]?.response?.result?.file_id,
      }),
    }).then((res) => {
      if (res.status == 200) {
        notify("Muvaffaqqiyatli saqlandi", "success");
      }
    });
  };
  useEffect(() => {
    fetch(import.meta.env.VITE_APP_URL + "/user/get-me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCompany(data.result.company_name);
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url:
              import.meta.env.VITE_APP_URL +
              "/user/files/" +
              data.result.company_logo,
            response: {
              result: {
                file_id: data.result.company_logo,
              },
            },
          },
        ]);
      });
  }, [token]);
  return (
    <Content
      style={{
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        padding: 50,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
      }}
    >
      <p>Kompaniya logosini yuklang</p>
      <Upload
        action={import.meta.env.VITE_APP_URL + "/user/upload"}
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      <p>Kompaniya nomini kiriting:</p>
      <Input
        placeholder="Kompaniya nomi"
        style={{ width: 400 }}
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      <Button type="primary" onClick={saveInfo} style={{ width: 400 }}>
        Saqlash
      </Button>
    </Content>
  );
};

export default App;
