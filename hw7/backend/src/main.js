import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import ScoreCardRoute from "./routes/index";

const app = express();
//init middleware
app.use(cors());
app.use(express.json());
//define routes
app.use("/api", ScoreCardRoute);

//app.use(bodyParser.json());
//define server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
