import {Fragment, useState} from 'react';
import styled from 'styled-components';
import {Calendar, Popover, Badge} from 'antd';
import 'antd/dist/antd.css';
import {
  Container,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
  Box,
} from '@mui/material';
import ModalButtonGroup from './ModalButtonGroup';
import {useQuery} from '@apollo/client';
import {useUser} from '../hook/useUser';
import moment from 'moment';
import {
  EVENTS_QUERY,
  CHOOSETIME_QUERY,
  EVENT_CREATED_SUBSCRIPTION,
  EVENT_UPDATED_SUBSCRIPTION,
  EVENT_DELETED_SUBSCRIPTION,
  MODIFY_EVENT_ATTENDER_MUTATION,
  CHOOSETIME_UPDATED_SUBSCRIPTION,
  DELETE_EVENT_MUTATION,
} from '../graphql';

const CalendarForm = styled.div`
  max-Height: 76vh; 
  margin-top: 10px ;
  overflow: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const DateCell = styled.dl`
  margin: 0;
  padding: 0;
  list-style: none;

  .ant-badge-status{
    width: 100%;
    overflow: hidden;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    ::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
}
::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
}
::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default function CalendarSelfdefined () {
  const [fullscreen, setFullScreen] = useState (true);
  const [viewMode, setViewMode] = useState ('raw');
  const [filter, setFilter] = useState ('all');
  const {name} = useUser ();
  const {
    data: data1,
    loading: loading1,
    subscribeToMore: subscribeToMore1,
  } = useQuery (EVENTS_QUERY, {
    variables: {
      name: name,
    },
  });

  const {
    data: data2,
    loading: loading2,
    subscribeToMore: subscribeToMore2,
  } = useQuery (CHOOSETIME_QUERY, {
    variables: {
      userName: name,
    },
  });

  var events = [];
  if (data1) events = data1.event;

  function getDateCellListData (value) {
    let listData = [];
    let validEvents = [];

    if (data2) {
      for (let i = 0; i < events.length; i++) {
        // value: a date
        let todayTakePlace = false;
        let maxAttendCountIdx = [0];
        for (let j = 0; j < events[i].attender.length; j++) {
          if (
            events[i].attender[j].length >
            events[i].attender[maxAttendCountIdx[0]]
          )
            maxAttendCountIdx = [j];
          else if (
            events[i].attender[j].length ===
            events[i].attender[maxAttendCountIdx[0]]
          )
            maxAttendCountIdx.append (j);
        }

        for (let j = 0; j < events[i].startTime.length; j++) {
          // j-th duration
          if (
            value >= moment (events[i].startTime[j]).startOf ('day') &&
            value <= moment (events[i].endTime[j]).endOf ('day')
          )
            todayTakePlace = true;
        }
        if (
          viewMode === 'result' &&
          !maxAttendCountIdx.some (due => data2.chooseTime[i][due])
        )
          todayTakePlace = false;

        if (todayTakePlace) validEvents.push (events[i]);
      }
    }

    // filter(all, created, addded)
    if (validEvents.length !== 0) {
      if (filter === 'created') {
        validEvents = validEvents.filter (
          e => e.launcher.toString () === name.toString ()
        );
      }
      if (filter === 'added')
        validEvents = validEvents.filter (
          e => e.launcher.toString () !== name.toString ()
        );
    }

    validEvents.forEach (e => {
      const active = moment ().isBetween (
        moment (e.startTime[0]).startOf ('day'),
        moment (e.endTime[e.startTime.length - 1]).endOf ('day')
      );

      listData.push ({
        type: `${active ? 'success' : 'default'}`,
        //type: 'success',
        name: `${e.name} ${active ? '(Active now)' : ''}`,
        content: e.content,
      });
      //console.log (e);
    });

    return listData || [];
  }

  function dateCellRender (value) {
    const listData = getDateCellListData (value);

    return (
      <DateCell>
        {listData.map (item => (
          <li key={item.id}>
            <Popover
              title={item.name}
              content={item.content}
              placement="topLeft"
            >
              <Badge status={item.type} text={item.name} />
            </Popover>
          </li>
        ))}
      </DateCell>
    );
  }

  function getMonthCellListData (value) {
    let listData = [];
    let validEvents = [];

    if (data2) {
      for (let i = 0; i < events.length; i++) {
        // value: a date
        let todayTakePlace = false;
        let maxAttendCountIdx = [0];
        for (let j = 0; j < events[i].attender.length; j++) {
          if (
            events[i].attender[j].length >
            events[i].attender[maxAttendCountIdx[0]]
          )
            maxAttendCountIdx = [j];
          else if (
            events[i].attender[j].length ===
            events[i].attender[maxAttendCountIdx[0]]
          )
            maxAttendCountIdx.append (j);
        }

        for (let j = 0; j < events[i].startTime.length; j++) {
          // j-th duration
          if (
            value >= moment (events[i].startTime[j]).startOf ('month') &&
            value <= moment (events[i].endTime[j]).endOf ('month')
          )
            todayTakePlace = true;
        }
        if (
          viewMode === 'result' &&
          !maxAttendCountIdx.some (due => data2.chooseTime[i][due])
        )
          todayTakePlace = false;

        if (todayTakePlace) validEvents.push (events[i]);
      }
    }

    // filter(all, created, addded)
    if (filter === 'created')
      validEvents = validEvents.filter (e =>
        e.launcher.includes (name.toString ())
      );
    if (filter === 'added')
      validEvents = validEvents.filter (
        e => !e.launcher.includes (name.toString ())
      );

    validEvents.forEach (e => {
      const active = moment ().isBetween (
        moment (e.startTime[0]).startOf ('day'),
        moment (e.endTime[e.startTime.length - 1]).endOf ('day')
      );

      listData.push ({
        type: `${active ? 'success' : 'default'}`,
        //type: 'success',
        name: `${e.name} ${active ? '(Active now)' : ''}`,
        content: e.content,
      });
      //console.log (e);
    });

    return listData || [];
  }

  function monthCellRender (value) {
    const listData = getMonthCellListData (value);
    return (
      <DateCell>
        {listData.map (item => (
          <li key={item.id}>
            <Popover
              title={item.name}
              content={item.content}
              placement="topLeft"
            >
              <Badge status={item.type} text={item.name} />
            </Popover>
          </li>
        ))}
      </DateCell>
    );
  }

  return (
    <Container
      style={{
        position: 'relative',
        alignItems: 'center',
      }}
    >
      <Box sx={{'& > :not(style)': {m: 1}}}>
        <FormControl component="fieldset">
          <ToggleButtonGroup
            color="secondary"
            value={viewMode}
            exclusive
            size="small"
            onChange={e => setViewMode (e.target.value)}
          >
            <ToggleButton value="raw">Raw</ToggleButton>
            <ToggleButton value="result">Result</ToggleButton>
          </ToggleButtonGroup>
        </FormControl>

        <FormControl component="fieldset">
          <ToggleButtonGroup
            color="secondary"
            value={filter}
            exclusive
            size="small"
            onChange={e => setFilter (e.target.value)}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="created">Created</ToggleButton>
            <ToggleButton value="added">Added</ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
        <FormControl component="fieldset">
          <ModalButtonGroup showTitle={false} />
        </FormControl>
      </Box>

      <CalendarForm>
        <Calendar
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
          fullscreen={fullscreen}
          style={{
            position: 'relative',
            maxWidth: '70vw',
          }}
        />
      </CalendarForm>
    </Container>
  );
}
