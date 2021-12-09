import "./App.css";
import { useEffect, useState, useRef } from "react";
import { Button, Input, message, Tag } from "antd";
import useChat from "./useChat";
import SignIn from "./Containers/signIn";

const LOCALSTORAGE_KEY = "save-me";

function App() {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const { status, messages, sendMessage, clearMessages } = useChat();
  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [me, setMe] = useState(savedMe || "");
  const bodyRef = useRef(null);

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

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn, me]);
  useEffect(() => {
    displayStatus(status);
  }, [status]);

  return signedIn ? (
    <div className="App">
      <div className="App-title">
        <h1>{me}'s Chatroom</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {messages.length === 0 ? (
          <p style={{ color: "#ccc" }}>No messages...</p>
        ) : (
          messages.map(({ name, body }, i) => {
            return (
              <p className="App-message" key={i}>
                <Tag color="blue">{name}</Tag>
                {body}
              </p>
            );
          })
        )}
      </div>
      <Input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            bodyRef.current.focus();
          }
        }}
        placeholder="Username"
        value={me}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
        disabled
      ></Input>
      <Input.Search
        ref={bodyRef}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter a username and a message body",
            });
            return;
          }
          sendMessage({ name: me, body: msg });
          setBody("");
        }}
      ></Input.Search>
    </div>
  ) : (
    <SignIn me={me} setMe={setMe} setSignedIn={setSignedIn} />
  );
}

export default App;
