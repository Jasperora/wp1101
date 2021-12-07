import WebSocket from "ws";
import mongoose from "mongoose";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const db = mongoose.connection;

db.once("open", () => {
  wss.on("connection", (ws) => {
    ws.onmessage = async (byteString) => {
      await dbMessage.save();
    };
    //sendData(['output',[payload]])
  });
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
  });
});
