import http from "http";
import express from "express";
import dotenv from "dotenv-defaults";
import WebSocket from "ws";
import mongoose from "mongoose";
import { sendData, sendStatus, initData } from "./wssConnect";
import Message from "./models/Message";

dotenv.config();

if (!process.env.MONGO_URL) {
  console.error("Missing MONGO_URL");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  throw new Error("DB connection error: " + error);
});

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const broadcastMessage = (data, status) => {
  wss.clients.forEach((client) => {
    sendData(data, client);
    sendStatus(status, client);
  });
};

db.once("open", () => {
  console.log("MongoDB connected!");

  wss.on("connection", (ws) => {
    initData(ws);
    ws.onmessage = async (byteString) => {
      const { data } = byteString;
      const [task, payload] = JSON.parse(data);
      switch (task) {
        case "input": {
          const { name, body } = payload;
          const message = new Message({ name, body });
          try {
            await message.save();
          } catch (e) {
            throw new Error("Message DB save error: " + e);
          }
          broadcastMessage(["output", [payload]], {
            type: "success",
            msg: "Message sent.",
          });
          break;
        }
        case "clear": {
          Message.deleteMany({}, () => {
            sendData(["cleared"], ws);
          });
          broadcastMessage(["cleared", [payload]], {
            type: "info",
            msg: "Message cache cleared.",
          });
          break;
        }

        default:
          break;
      }
    };
  });
  const port = process.env.PORT || 4000;
  server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
});
