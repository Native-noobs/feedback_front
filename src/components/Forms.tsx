import React, { useEffect, useState } from "react";
import { Button, Flex, Form, Input } from "antd";
import { QuestionType } from "../type/type";
import { toast } from "react-toastify";

const App: React.FC = () => {
  const [question, setQuestion] = useState<QuestionType[]>([]);
  const notify = (text: string, type: "success" | "error") => toast[type](text);

  const token = localStorage.getItem("auth");
  const Submit = () => {
    fetch(import.meta.env.VITE_APP_URL + "/question", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(question),
    })
      .then((res) => res.json())
      .then(() => {
        notify("Muvaffaqqiyatli saqlandi", "success");
      });
  };

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_URL + "/question", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result[0]) {
          setQuestion(data.result);
        } else {
          setQuestion([{ name: "", type: "single", variants: [] }]);
        }
      });
  }, []);
  return (
    <Form
      style={{
        width: "100%",
        padding: "20px",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Flex vertical gap={20}>
        {question.map((e, inx) => {
          return (
            <Flex vertical gap={10} key={inx}>
              <Input
                placeholder="Savol yozing"
                style={{ width: "600px" }}
                onChange={(e) => {
                  let copyQuestions = question.slice();
                  copyQuestions[inx].name = e.target.value;
                  setQuestion(copyQuestions);
                }}
                value={question[inx].name as string}
              />
              <Flex vertical gap={20} style={{ width: "600px" }}>
                {e.variants?.map((_, i) => {
                  return (
                    <Flex
                      key={i}
                      align="center"
                      gap={10}
                      style={{ width: "100%" }}
                    >
                      <Flex align="center" justify="center">
                        {i + 1}
                      </Flex>
                      <Input
                        placeholder="Variant yozing"
                        value={question[inx]?.variants[i].name as string}
                        onChange={(e) => {
                          let copyQuestions = [...question];
                          if (copyQuestions[inx]?.variants) {
                            copyQuestions[inx].variants[i].name =
                              e.target.value;
                            setQuestion(copyQuestions);
                          }
                        }}
                      />
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
          );
        })}
      </Flex>
      <Flex
        style={{ marginTop: "20px", width: "600px" }}
        justify="space-between"
      >
        <Button
          onClick={() => {
            setQuestion((prev) => [
              ...prev,
              { name: "", type: "single", variants: [] },
            ]);
          }}
          type="primary"
        >
          Savol qo'shish
        </Button>
        <Button
          type="default"
          style={{
            background: "red",
            opacity: question.length === 1 ? 0.5 : 1,
            color: "white",
          }}
          disabled={question.length === 1}
          onClick={() => {
            let copyQuestions = question.slice();
            copyQuestions.pop();
            setQuestion(copyQuestions);
          }}
        >
          Savolni o'chirish
        </Button>
        <Button
          type="primary"
          onClick={() => {
            let copyQuestions = question.slice();
            copyQuestions[copyQuestions.length - 1]?.variants?.push({
              name: "",
            });
            copyQuestions[copyQuestions.length - 1].type = "multi";
            setQuestion(copyQuestions);
          }}
        >
          Variant qo'shish
        </Button>
        <Button
          disabled={question[question.length - 1]?.variants?.length === 0}
          onClick={() => {
            let copyQuestions = question.slice();
            copyQuestions[copyQuestions.length - 1]?.variants?.pop();
            setQuestion(copyQuestions);
          }}
          style={{
            background: "red",
            opacity:
              question[question.length - 1]?.variants?.length === 0 ? 0.5 : 1,
            color: "white",
          }}
        >
          Variantni o'chirish
        </Button>
      </Flex>
      <Button
        onClick={Submit}
        type="primary"
        style={{ width: "600px", marginTop: "20px" }}
      >
        Saqlash
      </Button>
    </Form>
  );
};

export default App;
