import SignIn from "./SignIn";
import ChatRoom from "./ChatRoom";
import { useState, useEffect } from "react";
import { message } from "antd";
import styled from "styled-components";

const LOCAL_STORAGE_KEY = "save-me";

const Wrapper = styled.div`
display:flex
flex-direction:column
align-item:center
justify-content:center
height:100vh
width:500px
margin:auto
`;

const App = () => {
  const savedMe = localStorage.getItem(LOCAL_STORAGE_KEY);

  const [signedIn, setSignedIn] = useState(false);
  const [me, setMe] = useState(savedMe || "");

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = {
        content: msg,
        duration: 1.5,
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

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCAL_STORAGE_KEY, me);
    }
  }, [signedIn, me]);

  return (
    <Wrapper>
      {signedIn ? (
        <ChatRoom me={me} displayStatus={displayStatus} />
      ) : (
        <SignIn
          me={me}
          setMe={setMe}
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        />
      )}
    </Wrapper>
  );
};

export default App;
