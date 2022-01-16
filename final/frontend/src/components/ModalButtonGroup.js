import react, { useState, Fragment, useEffect } from "react";
import styled from "styled-components";
import { Modal, Input, Button, message, Tag, Divider } from "antd";
import { PlusCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { FormControl, FormLabel, Fab, Box } from "@mui/material";
import { Tooltip } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Stack from "@mui/material/Stack";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import moment from "moment";
import { useUser } from "../hook/useUser";
import { useMutation } from "@apollo/client";
import {
  CREATE_EVENT_MUTATION,
  ADD_EVENT_MUTATION,
  MODIFY_EVENT_ATTENDER_MUTATION,
} from "../graphql";
import { v4 as uuidv4 } from "uuid";
import { MessageSharp } from "@mui/icons-material";

function TimeModal(props) {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { startArr, endArr } = { ...props };

  function timeReadded() {
    let dulpicated = false;
    for (let i = 0; i < startArr.length; i++) {
      if (endTime === startArr[i] && startTime === endArr[i]) dulpicated = true;
      console.log(startTime, startArr[i]);
      console.log(endTime, endArr[i]);
      console.log("duplicated: ", dulpicated);
    }
    return dulpicated;
  }

  const showModal = () => {
    setStartTime(moment().startOf("day"));
    setEndTime(moment().endOf("day"));
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (endTime - startTime <= 0) {
      message.error("Start time cannot precede end time.");
    } else if (timeReadded()) {
      message.error("Time exists.");
    } else {
      props.setStartTime(startTime);
      props.setEndTime(endTime);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Fragment>
      <Button type="default" onClick={showModal}>
        <PlusCircleOutlined />
        Add Time
      </Button>
      <Modal
        title="Choose time"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            {/*Start Time*/}
            <MobileDateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Start time"
              value={startTime}
              onChange={(newValue) => {
                setStartTime(newValue);
              }}
            />
            {/*End Time*/}
            <MobileDateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="End time"
              value={endTime}
              onChange={(newValue) => {
                setEndTime(newValue);
              }}
            />
          </Stack>
        </LocalizationProvider>
      </Modal>
    </Fragment>
  );
}

const { TextArea } = Input;
const TimeBox = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  align-items: center;
  width: auto;
  margin: auto;
  height: fit-content;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export default function UglyModalGroup(props) {
  const { name } = useUser();
  const [createModalVisible, setCreateEventModalVisible] = useState(false);
  const [addEventModalVisible, setAddEventModalVisible] = useState(false);
  const [eventName, setEventName] = useState("");
  const [content, setContent] = useState("");
  const [startTime, setStartTime] = useState([]);
  const [endTime, setEndTime] = useState([]);
  const [createEvent] = useMutation(CREATE_EVENT_MUTATION);
  const [addEvent] = useMutation(ADD_EVENT_MUTATION);
  const [ID, setID] = useState("");

  const showCreateModal = () => {
    setEventName("");
    setContent("");
    setStartTime([]);
    setEndTime([]);
    setCreateEventModalVisible(true);
  };

  const handleCreateModalOk = async () => {
    if (eventName && startTime.length !== 0) {
      const startTimeArray = startTime.map((d) =>
        moment.duration(d, "milliseconds").asMilliseconds()
      );
      const endTimeArray = endTime.map((d) =>
        moment.duration(d, "milliseconds").asMilliseconds()
      );

      const {
        data: {
          createEvent: { id },
        },
      } = await createEvent({
        variables: {
          name: eventName,
          content: content,
          startTime: startTimeArray,
          endTime: endTimeArray,
          launcher: name,
          id: uuidv4(),
        },
      });
      await addEvent({
        variables: {
          userName: name,
          id: id,
        },
      });
      setCreateEventModalVisible(false);
      message.success("Event created.");
    } else {
      if (!eventName) message.error("An event name is required.");
      else if (startTime.length === 0) message.error("Please set event time.");
    }
  };

  const handleCreateModalCancel = () => {
    message.warn("Event was not created.");
    setCreateEventModalVisible(false);
  };

  const showAddModal = () => {
    setID("");
    setAddEventModalVisible(true);
  };

  const handleAddModalOk = async () => {
    const data = await addEvent({
      variables: {
        userName: name,
        id: ID,
      },
    });

    if (data.data.addEvent === "fail" || data.data.addEvent === "No user") {
      message.error("Invalid ID.");
      setID("");
    }
    if (data.data.addEvent === "You are already in") {
      message.error("You are already in.");
    } else setAddEventModalVisible(false);
  };

  const handleAddModalCancel = () => {
    message.warn("Event was not added.");
    setAddEventModalVisible(false);
  };

  function TimeTags(props) {
    let tagArr = [];
    for (let i = 0; i < startTime.length; i++) {
      const duration = endTime[i] - startTime[i];
      const tag = (
        <Tag
          icon={<ClockCircleOutlined />}
          color="default"
          style={{ margin: " 3px" }}
          key={uuidv4()}
        >
          {moment.duration(duration, "millisecond").humanize()}
          <h5>
            {"from "}
            <b>{moment(props.startTime[i]).format("YYYY/MM/DD")}</b>
          </h5>
          <h5>
            {"to "}
            <b>{moment(props.endTime[i]).format("YYYY/MM/DD")}</b>
          </h5>
        </Tag>
      );
      tagArr.push(tag);
    }
    // console.log("tagArr:", tagArr);
    return <Fragment>{[...tagArr]}</Fragment>;
  }

  return (
    <Fragment>
      <FormControl component="fieldset">
        {props.showTitle ? (
          <FormLabel component="legend">Actions</FormLabel>
        ) : (
          <Fragment />
        )}
        <Box sx={{ "& > :not(style)": { mx: 1 } }}>
          <Fab
            variant="extended"
            size="small"
            color="secondary"
            aria-label="add"
            onClick={showCreateModal}
          >
            <EditIcon size="small" sx={{ mr: 1 }} />
            Create event
          </Fab>
          <Tooltip title="Add event" aria-label="add event">
            <Fab
              color="secondary"
              size="small"
              aria-label="add-event"
              onClick={showAddModal}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>
      </FormControl>
      <Modal
        title="Create new event"
        visible={createModalVisible}
        onOk={handleCreateModalOk}
        onCancel={handleCreateModalCancel}
        autoFocusButton="ok"
      >
        <Stack spacing={3}>
          <Fragment>
            <Input
              size="large"
              placeholder="Event name"
              value={eventName}
              onInput={(e) => setEventName(e.target.value)}
            />
            <TextArea
              size="large"
              placeholder="Description"
              value={content}
              onInput={(e) => setContent(e.target.value)}
            />
            <Divider orientation="center">Event Time</Divider>
            <TimeBox>
              <TimeTags startTime={startTime} endTime={endTime} />
            </TimeBox>
            <TimeModal
              startArr={startTime}
              endArr={endTime}
              setStartTime={(t) => setStartTime([...startTime, t])}
              setEndTime={(t) => setEndTime([...endTime, t])}
            />
          </Fragment>
        </Stack>
      </Modal>
      <Modal
        title="Add new event"
        visible={addEventModalVisible}
        onOk={handleAddModalOk}
        onCancel={handleAddModalCancel}
        autoFocusButton="ok"
      >
        <Stack spacing={3}>
          <Input
            size="large"
            placeholder="Please key in event ID."
            value={ID}
            onInput={(e) => setID(e.target.value)}
          />
        </Stack>
      </Modal>
    </Fragment>
  );
}
