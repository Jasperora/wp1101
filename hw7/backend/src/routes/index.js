import express from "express";
import { createCard, queryCard, deleteDB } from "../mongo";

const router = express.Router();

router.delete("/clear-db", (_, res) => {
  deleteDB();
  res.json({ message: "Database cleared" });
});
router.post("/create-card", async (req, res) => {
  const { message, card } = await createCard(
    req.body.name,
    req.body.subject,
    req.body.score
  );
  res.json({ message: message, card: card });
});
router.get("/query-cards", async (req, res) => {
  const { messages, message } = await queryCard(
    req.query.type,
    req.query.queryString
  );
  console.log(message);
  res.json({ messages: messages, message, message });
});

export default router;
