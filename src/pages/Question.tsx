import { Button, Flex, Input, Radio, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";

const Question = () => {
  const token = localStorage.getItem("auth");
  const [user, setUser] = useState<any>();
  const [question, setQuestion] = useState<any>();
  const [feedback, setFeedback] = useState<{}>({});
  useEffect(() => {
    fetch(import.meta.env.VITE_APP_URL + "/user/get-me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.result);
      });
    fetch(import.meta.env.VITE_APP_URL + "/question", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.result);
      });
  }, []);
  const Submit = () => {
    const payload = Object.keys(feedback).map((e) => {
      return { feedback: feedback[e], question: e };
    });

    fetch(import.meta.env.VITE_APP_URL + "/feedback", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <>
      <header style={{ background: "#ccc", width: "100%" }}>
        <div className="container">
          <Flex
            gap={50}
            align="center"
            style={{
              height: "100px",
            }}
          >
            <Flex
              align="center"
              style={{
                borderRadius: "50%",
                width: "80px",
                height: "80px",
                overflow: "hidden",
              }}
            >
              <img
                style={{
                  objectFit: "cover",
                  width: "100px",
                  height: "100px",
                }}
                src={
                  import.meta.env.VITE_APP_URL +
                  "/user/files/" +
                  user?.company_logo
                }
                alt="photo"
              />
            </Flex>
            <h2>{user?.company_name}</h2>
          </Flex>
        </div>
      </header>
      <br />
      <br />
      <div className="container">
        <Content
          style={{
            width: "700px",
            margin: "0 auto",
          }}
        >
          <h1 style={{ textAlign: "center" }}>
            Quyidagi savollarga javob bering:
          </h1>
          <br />
          <br />
          <Flex vertical gap={20}>
            {question?.map((e: any) => {
              if (e.type == "single") {
                return (
                  <Flex key={e.id} vertical gap={10}>
                    <label htmlFor={e.id}>{e.name}</label>
                    <Input
                      placeholder={e.name}
                      id={e.id}
                      onChange={(event) => {
                        setFeedback({
                          ...feedback,
                          [e.id]: event.target.value,
                        });
                      }}
                    />
                  </Flex>
                );
              } else if (e.type == "multi") {
                return (
                  <Flex key={e.id} vertical gap={20}>
                    <label
                      htmlFor={e.id}
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {e.name}
                    </label>

                    <Radio.Group
                      onChange={(event) => {
                        setFeedback({
                          ...feedback,
                          [e.id]: event.target.value,
                        });
                      }}
                    >
                      <Space direction="vertical">
                        {e.variants?.map((e: any) => {
                          return (
                            <Radio key={e.id} value={e.name}>
                              {e.name}
                            </Radio>
                          );
                        })}
                      </Space>
                    </Radio.Group>
                  </Flex>
                );
              }
            })}
          </Flex>
          <br />
          <br />
          <Button style={{ width: "100%" }} onClick={Submit} type="primary">
            Jo'natish
          </Button>
        </Content>
      </div>
    </>
  );
};

export default Question;
