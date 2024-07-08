import { useEffect, useState } from "react";
import { FeedbackType } from "../type/type";
import { Button } from "antd";
import dayjs from "dayjs";

const FeedbackTable = () => {
    const token = localStorage.getItem("auth");
    const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
    useEffect(() => {
        fetch(import.meta.env.VITE_APP_URL + "/feedback", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setFeedbacks(data.result);
            });
    }, []);

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
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        }
    };
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td style={{ fontWeight: 800 }}>Savol</td>
                        <td style={{ fontWeight: 800 }}>Feedback</td>
                        <td style={{ fontWeight: 800 }}>Vaqti</td>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks?.map((e) => {
                        return (
                            <tr key={e.id as string}>
                                <td>{e.question}</td>
                                <td>{e.feedback}</td>
                                <td>
                                    {dayjs(e.created_at).format(
                                        "YYYY-MM-DD HH-mm"
                                    )}
                                </td>
                            </tr>
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
