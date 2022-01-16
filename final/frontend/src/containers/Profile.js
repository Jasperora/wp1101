import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import { Typography, Layout, Card, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useUser } from "../hook/useUser";
import { useQuery } from "@apollo/client";
import {
  EVENTS_QUERY,
  EVENT_CREATED_SUBSCRIPTION,
  EVENT_UPDATED_SUBSCRIPTION,
  EVENT_DELETED_SUBSCRIPTION,
} from "../graphql";
//import AccountSetting from '../components/AccountSetting';

const { Title, Paragraph, Text, Link } = Typography;
const { Header, Footer, Sider, Content } = Layout;

//const defaultUser = {name: 'John'};

const ProfileFrame = styled.div`
  align-items: center;
  align-content: center;
  margin: 16px auto;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  .Card {
    margin: 16px;
    width: 220px;
    @media screen and (max-width: 580px) {
      width: 180px;
    }
  }
`;

const CardTitle = styled.b`
  font-size: 64px;
`;

const Profile = (props) => {
  const { name, setName } = useUser();
  const [isSetting, setIsSetting] = useState(false);
  const navigate = useNavigate();
  const { numOfAdded, numOfCreated } = props;
  /*
  useEffect(() => {
    if (data) {
      let numOfAdded = 0;
      let numOfCreated = 0;
      for (let i = 0; i < data.event.length; i++) {
        if (data.event[i].launcher === name) numOfCreated++;
        else numOfAdded++;
      }
      setNumOfAdded(numOfAdded);
      setNumOfCreated(numOfCreated);
    }
  });


*/
  return (
    <ProfileFrame>
      <Title style={{ textAlign: "center" }}>{name}</Title>
      <CardGrid>
        <Card title="You've created" bordered={true} className="Card">
          <CardTitle>{numOfCreated}</CardTitle>
          <h2>events</h2>
        </Card>
        <Card title="You've  added" bordered={true} className="Card">
          <CardTitle>{numOfAdded} </CardTitle>
          <h2>events</h2>
        </Card>
      </CardGrid>

      {/*<Button
        type="default"
        shape="round"
        style={{marginTop: '30px'}}
        icon={<SettingOutlined />}
        size="large"
        block
        ghost={isSetting}
        disabled={isSetting}
        onClick={() => setIsSetting (true)}
      >
        Account Setting{' '}
      </Button>
      {isSetting
        ? <AccountSetting
            open={isSetting}
            resume={() => setIsSetting (false)}
          />
        : <Fragment />}*/}
    </ProfileFrame>
  );
};

export default Profile;
