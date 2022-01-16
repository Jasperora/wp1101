import mongo from "./mongo.js";
import { GraphQLServer, PubSub } from "graphql-yoga";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";
import User from "./resolvers/User.js";
import Date from "./resolvers/Date.js";
import Event from "./resolvers/Event.js";
import * as db from "./model.js";
import dotenv from "dotenv-defaults";
import jwt from "jsonwebtoken";
import express from "express";
import path from "path";

//const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
const app = express();
const opts = {
  port: process.env.PORT||5000,
  endpoint: "/graphql",
  cors: {
    credentials: true,
    origin: ["http://localhost:3000"],
  },
};
const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Date,
    Event,
  },
  context: async ({ request }) => {
    if (request) {
      if (request.headers && request.headers.cookie) {
        let token = request.headers.cookie || "";
        token = token.split("; ");
        const result = {};
        for (let i in token) {
          const cur = token[i].split("=");
          result[cur[0]] = cur[1];
        }
        try {
          const auth = await jwt.verify(result["jwt"], process.env.JWT_SECRET);
          // console.log("auth: ", auth);
          return { db, pubsub, auth };
        } catch (e) {
          return { db, pubsub };
        }
      } else {
        return { db, pubsub };
      }
    } else {
      return { db, pubsub };
    }
  },
});

server.express.use(express.static("../frontend/build"));
server.express.get("*", (req, res) =>
  res.sendFile(path.resolve("../frontend", "build", "index.html"))
);
server.express.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// server.express.get("/", (req, res) => {
//   res.send("hello");
// });

//server.express.use();
// server.express.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

mongo();

server.start(opts, () => {
  console.log(`The server is up on port ${opts.port}!`);
});
