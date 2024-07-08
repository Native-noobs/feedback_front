import { Flex, Space, theme, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import FeedbackTable from "../components/FeedbackTable";
const { Title } = Typography;
const Feedback = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Content style={{ margin: "30px 16px 0" }}>
            <Space
                direction="vertical"
                size="large"
                style={{ display: "flex" }}
            >
                <Flex
                    justify="space-between"
                    align="center"
                    style={{
                        padding: 24,
                        minHeight: 110,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Title style={{ margin: 0 }}>Feedback</Title>
                </Flex>
                <FeedbackTable />
            </Space>
        </Content>
    );
};

export default Feedback;
