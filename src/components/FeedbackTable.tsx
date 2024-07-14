import { useEffect, useState } from "react";
import { FeedbackType } from "../type/type";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";

const FeedbackTable = () => {
  const token = localStorage.getItem("auth");
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
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
      <table style={{ overflow: "scroll" }}>
        <thead>
          <tr>
            {feedbacks?.map((e, i) => {
              return (
                <td key={i} style={{ fontWeight: 800 }}>
                  {e.question}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {feedbacks?.map((e) => {
            return (
              <td>
                {e.feedback.map((e) => {
                  return (
                    <tr>
                      <td
                        style={{
                          width: "100%",
                          border: "none",
                        }}
                      >
                        {e}
                      </td>
                    </tr>
                  );
                })}
              </td>
            );
          })}
        </tbody>
      </table>
      <br />
      <Button type="primary" onClick={handleDownload}>
        Yuklab olish
      </Button>
    </div>
  );
};

export default FeedbackTable;
