import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv-defaults";
import { checkUser, newUser } from "./utility.js";

dotenv.config();

const saltRounds = 10;

const createToken = (name) =>
  jwt.sign({ name }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

const Mutation = {
  async createUser(parent, { name, password }, { db, pubsub }, info) {
    const hasOne = await checkUser(db, name);
    if (hasOne) return { status: "This name is used.", token: null };
    else {
      const hash = await bcrypt.hash(password, saltRounds);
      await newUser(db, name, hash);
      return { status: "success", token: await createToken(name) };
    }
  },
  async createEvent(
    parent,
    { name, content, launcher, endTime, startTime, id },
    { db, pubsub },
    info
  ) {
    // add event to EventModel
    const a = [];
    const user = await db.UserModel.findOne({ name: launcher });
    for (let i = 0; i < startTime.length; i++) a.push([user.name]);

    const event = new db.EventModel({
      name,
      content,
      launcher,
      endTime,
      startTime,
      attender: a,
      id: id,
    });
    await event.save();
    pubsub.publish(`EVENT_CREATED ${launcher}`, {
      eventCreated: { event: event },
    });

    return event;
  },
  async login(parent, { name, password }, { db, auth }, info) {
    const hasOne = await checkUser(db, name);
    if (hasOne) {
      const user = await db.UserModel.findOne({ name });
      const res = await bcrypt.compare(password, user.password);
      if (res) return { status: "success", token: await createToken(name) };
      else return { status: "fail", token: null };
    } else return { status: "fail", token: null };
  },
  async addEvent(parent, { userName, id }, { db, pubsub }, info) {
    // add event to UserModel (for users to remember their events)
    const user = await db.UserModel.findOne({ name: userName });
    if (!user) return "No user";
    const prev = user.events;
    const event = await db.EventModel.findOne({ id: id });
    if (!event) return "fail";
    let hasOne = false;
    for (let i = 0; i < user.events.length; i++) {
      if (user.events[i] === event.id) hasOne = true;
    }
    if (hasOne) {
      return "You are already in";
    }
    await db.UserModel.updateOne(
      { name: userName },
      { $set: { events: [...prev, id] } }
    );

    // change chooseTime in UserModel
    const prevChooseTime = user.chooseTime;
    const newTime = [];
    if (event.launcher === user.name) {
      for (let i = 0; i < event.startTime.length; i++) newTime.push(true);
    } else {
      for (let i = 0; i < event.startTime.length; i++) newTime.push(false);
    }
    prevChooseTime.push(newTime);
    await db.UserModel.updateOne(
      { name: userName },
      { $set: { chooseTime: prevChooseTime } }
    );
    pubsub.publish(`CHOOSETIME_UPDATED ${userName}`, {
      chooseTimeUpdated: prevChooseTime,
    });
    pubsub.publish(`EVENT_UPDATED ${user.name}`, {
      eventUpdated: { event: event },
    });
    return "success";
  },
  async modifyEventAttender(
    parent,
    { action, eventID, userName, index },
    { db, pubsub },
    info
  ) {
    // change attender in EventModel
    const event = await db.EventModel.findOne({ id: eventID });
    if (!event) return "fail";
    const prev = event.attender;
    if (action === "add") {
      prev[index] = [...prev[index], userName];
      await db.EventModel.updateOne(
        { id: eventID },
        { $set: { attender: prev } }
      );
    }
    if (action === "sub") {
      prev[index] = prev[index].filter((name) => name !== userName);
      await db.EventModel.updateOne(
        { id: eventID },
        { $set: { attender: prev } }
      );
    }
    pubsub.publish(`EVENT_UPDATED ${userName}`, {
      eventUpdated: { event: event },
    });

    // change chooseTime in UserModel
    const user = await db.UserModel.findOne({ name: userName });
    let prevChooseTime = user.chooseTime;
    let eventIndex = 0;
    for (let i = 0; i < user.events.length; i++) {
      if (user.events[i] === eventID) {
        eventIndex = i;
      }
    }
    prevChooseTime[eventIndex][index] = !prevChooseTime[eventIndex][index];
    await db.UserModel.updateOne(
      { name: userName },
      { $set: { chooseTime: prevChooseTime } }
    );
    pubsub.publish(`CHOOSETIME_UPDATED ${userName}`, {
      chooseTimeUpdated: prevChooseTime,
    });
    return "success";
  },
  async deleteEvent(parent, { eventID }, { db, pubsub }, info) {
    // 1. delete event in EventModel
    const event = await db.EventModel.findOne({ id: eventID });
    if (!event) return "Wrong event ID";
    await db.EventModel.deleteOne({ id: eventID });

    // 2. find all users and update their chooseTime
    const users = await db.UserModel.find({ events: { $in: [eventID] } });
    if (!users) return "No users are in";
    for (let i = 0; i < users.length; i++) {
      let eventIndex = 0;
      for (let j = 0; j <= users[i].events.length; j++) {
        if (users[i].events[j] === eventID) eventIndex = j;
      }
      let newChooseTime = [];
      for (let k = 0; k < users[i].chooseTime.length; k++) {
        if (k === eventIndex) continue;
        else newChooseTime.push(users[i].chooseTime[k]);
      }
      await db.UserModel.updateOne(
        { name: users[i].name },
        { $set: { chooseTime: newChooseTime } }
      );
    }

    // 3. find all users that have this event and delete their event
    for (let i = 0; i < users.length; i++) {
      const newEventArr = users[i].events.filter((e) => e != eventID);
      await db.UserModel.updateOne(
        { name: users[i].name },
        { $set: { events: newEventArr } }
      );
    }
    // publish and return
    pubsub.publish(`EVENT_DELETED`, { eventDeleted: eventID });
    return "success";
  },
  async initialization(parent, args, { auth }, info) {
    // console.log("Auth: ", auth);
    if (auth) {
      return { authName: auth.name, status: "success" };
    } else return { authName: null, status: "fail" };
  },
};

export default Mutation;
