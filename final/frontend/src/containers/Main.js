import React, { useState } from "react";
import { useUser } from "../hook/useUser";
import CalendarSelfDefined from "../components/Calendar";
import MainBar from "../components/MainBar";
import { Layout } from "antd";
import MainSider from "../components/MainSider";
import Profile from "./Profile";
import MyEvents from "../components/MyEvents";

const { Header, Footer, Sider, Content } = Layout;

const Main = () => {
  const { name } = useUser();
  const [showPage, setShowPage] = useState("My Calender");
  const [numOfCreated, setNumOfCreated] = useState(0);
  const [numOfAdded, setNumOfAdded] = useState(0);
  return (
    <Layout
      style={{
        position: "fixed",
      }}
    >
      <MainBar name={name} setShowPage={setShowPage} />
      <Content
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          padding: "16px 0",
        }}
      >
        {/*My Calender*/}
        <Layout
          hasSider
          style={{
            display: `${showPage === "My Calender" ? "" : "none"}`,
          }}
        >
          <Sider width={200} style={{ background: "transparent" }}>
            <MainSider />
          </Sider>
          <Content style={{ height: "fit-content" }}>
            <CalendarSelfDefined />
          </Content>
        </Layout>
        {/*Profile*/}
        <Content
          style={{
            height: "fit-content",
            display: `${showPage === "Profile" ? "flex" : "none"}`,
            alignItems: "center",
          }}
        >
          <Profile numOfAdded={numOfAdded} numOfCreated={numOfCreated} />
        </Content>
        {/*My Events*/}
        <Content
          style={{
            height: "fit-content",
            display: `${showPage === "My Events" ? "flex" : "none"}`,
            alignItems: "center",
          }}
        >
          <MyEvents
            setNumOfAdded={setNumOfAdded}
            setNumOfCreated={setNumOfCreated}
          />
        </Content>
      </Content>
    </Layout>
  );
};

export default Main;
