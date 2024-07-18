import { useEffect, useState } from "react";
import { FeedbackType, QuestionType } from "../type/type";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";

const FeedbackTable = () => {
  const token = localStorage.getItem("auth");
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [search, setSearch] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_URL + "/feedback/v2?search=" + search, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 401) {
          navigate("/");
        }
        setFeedbacks(data.result);
      });
    fetch(import.meta.env.VITE_APP_URL + "/question/for-admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 401) {
          navigate("/");
        }
        setQuestions(data.result);
      });
  }, [token, search]);
  const handleDownload = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_APP_URL + "/feedback/download",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "feedbacks.xlsx");
      document.body.appendChild(link);
      link.click();

      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div>
      <Input
        placeholder="Feedbacklar ichidan qidirish"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <br />
      <br />
      <br />
      <div style={{ overflow: "scroll" }}>
        <div className="item">
          {questions?.map((e) => {
            return (
              <div key={e.id} className="row">
                <div>Savol: {e.name}</div>
              </div>
            );
          })}
        </div>
        <br />
        <hr style={{ opacity: 0.5 }} />
        <br />

        {feedbacks?.map((e) => {
          return (
            <div key={e.id}>
              <div className="item">
                {e.answers.map((e) => {
                  return (
                    <div key={e.id} className="row">
                      {/* <div>Savol: {e.question}</div> */}
                      <div>Javob: {e.feedback}</div>
                    </div>
                  );
                })}
              </div>
              <br />
            </div>
          );
        })}
      </div>
      <br />
      <Button type="primary" onClick={handleDownload}>
        Yuklab olish
      </Button>
    </div>
  );
};

export default FeedbackTable;
