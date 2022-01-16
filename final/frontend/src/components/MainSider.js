import {Fragment} from 'react';
import {
  PlusCircleOutlined,
  UserAddOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import {Menu, Popover} from 'antd';
import styled from 'styled-components';
import {EVENTS_QUERY} from '../graphql';
import {useQuery} from '@apollo/client';
import {useUser} from '../hook/useUser';

const {SubMenu} = Menu;

const SiderFrame = styled.div`
  display: flex;
  max-height: 85vh;
  overflow-x: hidden;
  overflow: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export default function MainSider () {
  const {name} = useUser ();
  const {data, loading, subscribeToMore} = useQuery (EVENTS_QUERY, {
    variables: {
      name: name,
    },
  });
  var events = [];
  if (data) events = data.event;

  {
    /*function eventDetails({event}) {
    const {id, attender, startTime, endTime, content, launcher} = {
      ...event,
    };
  }*/
  }

  return (
    <SiderFrame>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
      >
        <SubMenu key="all" icon={<CheckOutlined />} title="All">
          {events.map (e => <Menu.Item key={e.id}>{e.name}</Menu.Item>)}
        </SubMenu>
        <SubMenu key="created" icon={<UserAddOutlined />} title="Created">
          {events
            .filter (e => e.launcher.toString () === name.toString ())
            .map (e => <Menu.Item key={e.id}>{e.name}</Menu.Item>)}
        </SubMenu>
        <SubMenu key="added" icon={<PlusCircleOutlined />} title="Added">
          {events
            .filter (e => e.launcher.toString () !== name.toString ())
            .map (e => <Menu.Item key={e.id}>{e.name}</Menu.Item>)}
        </SubMenu>
      </Menu>
    </SiderFrame>
  );
}
