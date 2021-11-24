import mongoose from "mongoose";
import ScoreCard from "./models/ScoreCard";

require("dotenv-defaults").config("../.env");
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("mongo db connection created"))
  .catch((e) => {
    console.log("mongo db connection failed");
    console.log(e);
  });

const deleteDB = async () => {
  try {
    await ScoreCard.deleteMany({});
    const msg = "Datbase deleted";
    return msg;
  } catch (e) {
    throw new Error("Database deletion failed");
  }
};
const createCard = async (name, subject, score) => {
  const existing = await ScoreCard.findOne({ name, subject });
  if (existing) {
    try {
      await ScoreCard.deleteMany({ name, subject });
    } catch (e) {
      throw new Error("Can't delete card");
    }
    try {
      const newCard = new ScoreCard({ name, subject, score });
      newCard.save();
      return {
        message: `Updating(${name},${subject},${score})`,
        card: newCard,
      };
    } catch (e) {
      throw new Error("Can't add card");
    }
  } else {
    try {
      const newCard = new ScoreCard({ name, subject, score });
      newCard.save();
      return {
        message: `Adding(${name},${subject},${score})`,
        card: newCard,
      };
    } catch (e) {
      throw new Error("Can't add card");
    }
  }
};
const queryCard = async (type, queryString) => {
  if (type === "name") {
    const existing = await ScoreCard.findOne({ name: queryString });
    if (existing) {
      const msg = await ScoreCard.find({ name: queryString });
      const messages = [];
      for (let i = 0; i < msg.length; i++) {
        messages[
          i
        ] = `Name:${msg[i].name},Subject:${msg[i].subject},Score:${msg[i].score}`;
      }
      return {
        messages: messages,
        message: "find",
      };
    } else {
      return {
        messages: null,
        message: `Name(${queryString}) not found!`,
      };
    }
  }
  if (type === "subject") {
    const existing = await ScoreCard.findOne({ subject: queryString });
    if (existing) {
      const msg = await ScoreCard.find({ subject: queryString });
      const messages = [];
      for (let i = 0; i < msg.length; i++) {
        messages[
          i
        ] = `Name:${msg[i].name},Subject:${msg[i].subject},Score:${msg[i].score}`;
      }
      return {
        messages: messages,
        message: "find",
      };
    } else {
      return {
        messages: null,
        message: `Subject(${queryString}) not found!`,
      };
    }
  }
};

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", async () => {
  await deleteDB();
});

export { createCard, deleteDB, queryCard };
