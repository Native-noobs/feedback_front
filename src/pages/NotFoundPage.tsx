import { Flex } from "antd";
import lost_image from "../assets/Group 1 (1).svg";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
    return (
        <Flex
            align="center"
            justify="center"
            style={{ height: "100dvh" }}
            vertical
            gap={50}
        >
            <h1 style={{ fontSize: "70px" }}>Oops!</h1>
            <p style={{ fontFamily: "monospace", fontSize: "20px" }}>
                Adashdingiz, bunday sahifa topilmadi
            </p>
            <img src={lost_image} alt="" width={500} />
            <Link to={"/auth"}>Asosiy sahifaga qaytish</Link>
        </Flex>
    );
};
export default NotFoundPage;
