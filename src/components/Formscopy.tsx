import React, { useEffect, useState } from "react";
import { Button, Flex, Form, Input, Select } from "antd";
import { QuestionType } from "../type/type";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

const Forms: React.FC = () => {
  const [question, setQuestion] = useState<QuestionType>({
    name: "",
    type: "single",
    variants: [],
  });
  const [questions, setQuestions] = useState<QuestionType[]>();
  const notify = (text: string, type: "success" | "error") => toast[type](text);

  const token = localStorage.getItem("auth");
  const Submit = () => {
    fetch(import.meta.env.VITE_APP_URL + "/question", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify([question]),
    })
      .then((res) => res.json())
      .then(() => {
        fetchData();
        setQuestion({ name: "", type: question.type, variants: [] });
        notify("Muvaffaqqiyatli saqlandi", "success");
      });
  };
  const fetchData = () => {
    fetch(import.meta.env.VITE_APP_URL + "/question", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result[0]) {
          setQuestions(data.result);
        }
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    setQuestion({
      name: inputValue,
      type: question.type,
      variants: question.variants,
    });
  };
  const handleChangeVariant = (e: "multi" | "single" | "number") => {
    if (e === "multi") {
      setQuestion({
        name: "",
        type: "multi",
        variants: [{ name: "" }],
      });
    } else {
      setQuestion({
        name: "",
        type: e,
        variants: [],
      });
    }
  };
  const handleDelete = (id: string) => {
    fetch(import.meta.env.VITE_APP_URL + "/question/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        fetchData();
        notify("Muvaffaqqiyatli o'chirildi", "success");
      });
  };
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
      <h2>Savollar ro'yhati</h2>
      <br />
      <Flex vertical gap={20}>
        {questions?.map((e, inx) => {
          return (
            <Flex vertical gap={10} key={inx}>
              <Flex gap={20}>
                <p style={{ width: "100%" }}>{e.name}</p>
                <Button
                  style={{ background: "red" }}
                  onClick={() => {
                    handleDelete(e.id as string);
                  }}
                >
                  <MdDelete color="white" />
                </Button>
              </Flex>
              <Flex vertical gap={10} style={{ width: "600px" }}>
                {e.variants.map((_, i) => {
                  return (
                    <Flex
                      key={i}
                      align="center"
                      gap={10}
                      style={{ width: "98%", marginLeft: "2%" }}
                    >
                      <Flex align="center" justify="center">
                        {i + 1}
                      </Flex>
                      <p style={{ width: "100%" }}>
                        {questions[inx]?.variants[i].name}
                      </p>
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
          );
        })}
      </Flex>
      <br />
      <h2>Yangi savol qo'shish</h2>
      <Flex
        style={{ marginTop: "20px", width: "600px" }}
        justify="space-between"
        gap={10}
        vertical
      >
        <Input
          placeholder="Savolingizni yozing"
          inputMode="decimal"
          onChange={handleChange}
          value={question.name as string}
        />
        <Flex vertical style={{ marginLeft: "10px" }} gap={10}>
          {question?.variants.map((_, i) => {
            return (
              <Flex gap={10}>
                <Flex align="center" justify="center">
                  {i + 1}
                </Flex>
                <Input
                  placeholder="Variant yozing"
                  onChange={(e) => {
                    const copyQuestion = { ...question };
                    copyQuestion.variants[i].name = e.target.value;
                    setQuestion(copyQuestion);
                  }}
                />
              </Flex>
            );
          })}
        </Flex>
        <Flex justify="space-between">
          <Select
            defaultValue="single"
            style={{ width: 320 }}
            onChange={handleChangeVariant}
            options={[
              { value: "single", label: "Input" },
              { value: "multi", label: "Multiple" },
              { value: "number", label: "Number" },
            ]}
          />
          {question.type == "multi" && (
            <Flex gap={10}>
              <Button
                onClick={() => {
                  const copyQuestion = { ...question };
                  copyQuestion.variants.push({ name: "" });
                  setQuestion(copyQuestion);
                }}
                style={{ width: "100px", background: "green", color: "white" }}
              >
                +
              </Button>
              <Button
                disabled={question.variants.length === 1}
                onClick={() => {
                  if (question.variants.length !== 1) {
                    const copyQuestion = { ...question };
                    copyQuestion.variants.pop();
                    setQuestion(copyQuestion);
                  }
                }}
                style={{
                  width: "100px",
                  background: "red",
                  color: "white",
                  opacity: question.variants.length === 1 ? "0.5" : "1",
                }}
              >
                -
              </Button>
            </Flex>
          )}
        </Flex>
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

export default Forms;
