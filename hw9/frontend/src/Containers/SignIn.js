import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Title from "../Components/Title";
import { message } from "antd";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const displayStatus = (payload) => {
  if (payload.msg) {
    const { type, msg } = payload;
    const content = {
      content: msg,
      duration: 0.5,
    };
    switch (type) {
      case "success":
        message.success(content);
        break;
      case "error":
      default:
        message.error(content);
        break;
    }
  }
};

const SignIn = ({ me, setMe, setSignedIn }) => {
  return (
    <Main>
      <Title>
        <h1>My Chat Room</h1>
      </Title>
      <Input.Search
        prefix={<UserOutlined />}
        value={me}
        enterButton="Sign In"
        onChange={(e) => setMe(e.target.value)}
        placeholder="Enter your name"
        size="large"
        style={{ width: 300, margin: 50 }}
        onSearch={(name) => {
          if (!name) displayStatus({ type: "error", msg: "Missing user name" });
          else setSignedIn(true);
        }}
      />
    </Main>
  );
};

export default SignIn;
