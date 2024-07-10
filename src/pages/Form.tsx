import { Flex, Space, theme, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import Forms from "../components/Formscopy";
const { Title } = Typography;
const Form = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Content style={{ margin: "30px 16px 0" }}>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
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
          <Title style={{ margin: 0 }}>Form</Title>
        </Flex>
        <Forms />
      </Space>
    </Content>
  );
};

export default Form;
