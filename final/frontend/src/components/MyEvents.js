import react, {useState, Fragment, useEffect} from 'react';
import styled from 'styled-components';
import {
  Container,
  FormControl,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Button,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Collapse, Divider, message, Popover, Tag, Tooltip} from 'antd';
import {useQuery, useMutation} from '@apollo/client';
import {useUser} from '../hook/useUser';
import moment from 'moment';
import ModalButtonGroup from './ModalButtonGroup';
import {ClockCircleOutlined, ConsoleSqlOutlined} from '@ant-design/icons';
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
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {v4 as uuidv4} from 'uuid';

const {Panel} = Collapse;

const CollapseForm = styled.div`
  margin: 10px 0;
  box-shadow: 0 0 6px 6px rgba(249, 240, 255, 0.7);
  max-height: 75vh;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const NakedTimeShowFrame = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  margin-left: 16px;
`;

function TimeShow (props) {
  const {startTime, endTime, participants, eventID} = {...props};
  let Times = [];
  const hideInPanel = startTime.length > 2;
  const {name} = useUser ();
  const [modifyEventAttender] = useMutation (MODIFY_EVENT_ATTENDER_MUTATION);
  // console.log("props.Time: ", props.Time);
  for (let i = 0; i < startTime.length; i++) {
    const duration = endTime[i] - startTime[i];

    const popoverContent = (
      <Fragment>
        {participants[i].map (par => <p style={{margin: '3px'}}>{par}</p>)}
      </Fragment>
    );

    function TimeTag () {
      // have problem here

      const [chosen, setChosen] = useState (props.Time ? props.Time[i] : true);
      return (
        <Popover
          title="Participants"
          content={popoverContent}
          placement="topLeft"
        >
          <i>
            <p style={{fontSize: '13px'}}>
              <Button
                onClick={async () => {
                  setChosen (!chosen);
                  chosen
                    ? message.warning ('Time canceled.')
                    : message.success ('Time chosen.');
                  if (chosen) {
                    await modifyEventAttender ({
                      variables: {
                        action: 'sub',
                        eventID: eventID,
                        userName: name,
                        index: i,
                      },
                    });
                  } else {
                    await modifyEventAttender ({
                      variables: {
                        action: 'add',
                        eventID: eventID,
                        userName: name,
                        index: i,
                      },
                    });
                  }
                }}
              >
                <Tag color={chosen ? '#87d068' : 'default'}>
                  <ClockCircleOutlined size={3} />
                  {'  '}
                  {moment.duration (duration).humanize ()}
                </Tag>
              </Button>
              {'  from '}
              <b>{moment (startTime[i]).format ('YYYY/MM/DD HH:mm')}</b>
              {' to '}
              <b>{moment (endTime[i]).format ('YYYY/MM/DD HH:mm')}</b>
            </p>
          </i>
        </Popover>
      );
    }

    Times.push (TimeTag ());
  }

  return (
    <dl>
      {hideInPanel
        ? <Collapse ghost>
            <Panel header="show all time" key={uuidv4 ()}>
              {[...Times]}
            </Panel>
          </Collapse>
        : <NakedTimeShowFrame>{[...Times]}</NakedTimeShowFrame>}
    </dl>
  );
}

const EventUnit = ({event, Time}) => {
  const {id, attender, startTime, endTime, content, launcher} = {
    ...event,
  };
  const {name} = useUser ();
  const [deleteEvent] = useMutation (DELETE_EVENT_MUTATION);
  const chooseTime = Time;
  // console.log("chooseTime: ", chooseTime);
  return (
    <Fragment>
      <p>{content}</p>
      <hr />
      <h3>
        <dt>
          <b>Time: </b>
        </dt>
        <TimeShow
          startTime={startTime}
          endTime={endTime}
          participants={attender}
          eventID={id}
          Time={chooseTime}
        />
      </h3>
      <h3>
        <b>Creator: </b>
        {launcher}
      </h3>
      <Divider orientation="center" />
      <h3>
        <b>Event ID: </b>
        <CopyToClipboard
          text={id}
          onCopy={() => message.success ('Event ID copied success.')}
        >
          <Button variant="text" style={{textTransform: 'none'}}>
            {id}
          </Button>
        </CopyToClipboard>
        <Tooltip title="Delete event">
          <Button
            color="inherit"
            disabled={name.toString () !== launcher.toString ()}
            onClick={() =>
              deleteEvent ({
                variables: {eventID: id},
              })}
          >
            <DeleteOutlineIcon size="small" />
          </Button>
        </Tooltip>
      </h3>
    </Fragment>
  );
};

function MyEvents (props) {
  const [viewMode, setViewMode] = useState ('raw');
  const [filter, setFilter] = useState ('all');
  const {name} = useUser ();
  const {setNumOfAdded, setNumOfCreated} = props;

  useEffect (() => {
    if (data1) {
      let numOfAdded = 0;
      let numOfCreated = 0;
      for (let i = 0; i < data1.event.length; i++) {
        if (data1.event[i].launcher === name) numOfCreated++;
        else numOfAdded++;
      }
      setNumOfAdded (numOfAdded);
      setNumOfCreated (numOfCreated);
    }
  });

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

  useEffect (
    () => {
      try {
        subscribeToMore2 ({
          document: CHOOSETIME_UPDATED_SUBSCRIPTION,
          variables: {userName: name},
          updateQuery: (prev, {subscriptionData}) => {
            if (!subscriptionData.data) return prev;
            const newData = subscriptionData.data.chooseTimeUpdated;
            console.log ('newData: ', newData);
            return {
              chooseTime: newData,
            };
          },
        });
      } catch (e) {}
    },
    [subscribeToMore2]
  );

  useEffect (
    () => {
      try {
        subscribeToMore1 ({
          document: EVENT_CREATED_SUBSCRIPTION,
          variables: {name: name},
          updateQuery: (prev, {subscriptionData}) => {
            if (!subscriptionData.data) return prev;
            const newEvent = subscriptionData.data.eventCreated.event;
            return {
              event: [...prev.event, newEvent],
            };
          },
        });
      } catch (e) {}
    },
    [subscribeToMore1]
  );

  useEffect (
    () => {
      try {
        subscribeToMore1 ({
          document: EVENT_UPDATED_SUBSCRIPTION,
          variables: {userName: name},
          updateQuery: (prev, {subscriptionData}) => {
            if (!subscriptionData.data) return prev;
            const newEvent = subscriptionData.data.eventUpdated.event;
            let hasOne = false;
            for (let i = 0; i < prev.event.length; i++) {
              if (prev.event[i].id === newEvent.id) hasOne = true;
            }
            if (hasOne) {
              return {event: prev.event};
            } else {
              console.log (newEvent);
              return {
                event: [...prev.event, newEvent],
              };
            }
          },
        });
      } catch (e) {}
    },
    [subscribeToMore1]
  );

  useEffect (
    () => {
      try {
        subscribeToMore1 ({
          document: EVENT_DELETED_SUBSCRIPTION,
          updateQuery: (prev, {subscriptionData}) => {
            if (!subscriptionData.data) return prev;
            const deletedEventID = subscriptionData.data.eventDeleted;
            const newEvents = prev.event.filter (e => e.id !== deletedEventID);
            return {
              event: newEvents,
            };
          },
        });
      } catch (e) {}
    },
    [subscribeToMore1]
  );

  function handleData () {
    let Panels = [];
    for (let i = 0; i < data1.event.length; i++) {
      function pushEventToArr () {
        Panels.push (
          <Panel header={data1.event[i].name} key={data1.event[i].id}>
            <EventUnit
              event={data1.event[i]}
              Time={data2.chooseTime[i]}
              key={`1${data1.event[i].id}1`}
            />
          </Panel>
        );
      }

      function takePartIn () {
        let maxTimeIdx = [0];
        for (let j = 0; j < data1.event[i].attender.length; j++) {
          if (
            data1.event[i].attender[j].length >
            data1.event[i].attender[maxTimeIdx[0]].length
          )
            maxTimeIdx = [j];
          else if (
            data1.event[i].attender[j].length ===
            data1.event[i].attender[maxTimeIdx[0]].length
          )
            maxTimeIdx.push (j);
        }
        return data2.chooseTime[i]
          ? maxTimeIdx.some (idx => data2.chooseTime[i][idx])
          : false;
      }

      if (filter === 'created') {
        if (data1.event[i].launcher.includes (name.toString ()))
          if (viewMode === 'result') {
            if (takePartIn ()) pushEventToArr ();
          } else pushEventToArr ();
      } else if (filter === 'added') {
        if (!data1.event[i].launcher.includes (name.toString ()))
          if (viewMode === 'result') {
            if (takePartIn ()) pushEventToArr ();
          } else pushEventToArr ();
      } else {
        if (viewMode === 'result') {
          if (takePartIn ()) pushEventToArr ();
        } else pushEventToArr ();
      }
    }
    return <Fragment>{[...Panels]}</Fragment>;
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
          <FormLabel component="legend">View mode</FormLabel>
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
          <FormLabel component="legend">Filter</FormLabel>
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
        <ModalButtonGroup showTitle={true} />
      </Box>
      <CollapseForm>
        <Collapse>
          {data1 && data2 ? <Fragment>{handleData ()}</Fragment> : <div />}
        </Collapse>
      </CollapseForm>
    </Container>
  );
}

export default MyEvents;
