import React, { useEffect, useState } from "react";
import { Button, Flex, Form, Input } from "antd";
import { QuestionType } from "../type/type";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

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
        {question
          .filter((e) => e.status !== "delete")
          .map((e, inx) => {
            return (
              <Flex vertical gap={10} key={inx}>
                <Flex gap={20}>
                  <Input
                    placeholder="Savol yozing"
                    style={{ width: "600px" }}
                    onChange={(e) => {
                      const copyQuestions = question.slice();
                      copyQuestions[inx].name = e.target.value;
                      setQuestion(copyQuestions);
                    }}
                    value={question[inx].name as string}
                  />
                  <Button
                    style={{ background: "red" }}
                    onClick={() => {
                      const copyQuestions = [...question];
                      if (copyQuestions[inx]?.variants) {
                        copyQuestions[inx].status = "delete";
                        setQuestion(copyQuestions);
                      }
                    }}
                  >
                    <MdDelete color="white" />
                  </Button>
                </Flex>
                <Flex vertical gap={20} style={{ width: "600px" }}>
                  {e.variants
                    ?.filter((e) => e.status !== "delete")
                    .map((_, i) => {
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
                              const copyQuestions = [...question];
                              if (copyQuestions[inx]?.variants) {
                                copyQuestions[inx].variants[i].name =
                                  e.target.value;
                                setQuestion(copyQuestions);
                              }
                            }}
                          />
                          <Button
                            style={{ background: "red" }}
                            onClick={() => {
                              const copyQuestions = [...question];
                              if (copyQuestions[inx]?.variants) {
                                copyQuestions[inx].variants[i].status =
                                  "delete";
                                setQuestion(copyQuestions);
                              }
                            }}
                          >
                            <MdDelete color="white" />
                          </Button>
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
          type="primary"
          onClick={() => {
            const copyQuestions = [...question];
            copyQuestions[copyQuestions.length - 1]?.variants?.push({
              name: "",
            });
            copyQuestions[copyQuestions.length - 1].type = "multi";
            setQuestion(copyQuestions);
          }}
        >
          Variant qo'shish
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
