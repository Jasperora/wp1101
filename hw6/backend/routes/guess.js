import express from "express";
import { genNumber, getNumber } from "../core/getNumber";

const router = express.Router();

function roughScale(x, base) {
  const parsed = parseInt(x, base);
  if (isNaN(parsed)) {
    return 0;
  }
  return parsed;
}

router.post("/start", (_, res) => {
  genNumber();
  res.json({ msg: "The game has started." });
});

router.get("/guess", (req, res) => {
  const number = getNumber();
  const guessed = roughScale(req.query.number, 10);
  if (!guessed || guessed < 1 || guessed > 100) {
    res
      .status(406)
      .json({ msg: `${req.query.number} is not a valid number (1 - 100)` });
  } else if (number === guessed) {
    res.json({ msg: "Equal" });
  } else if (number < guessed) {
    res.json({ msg: "Smaller" });
  } else if (number > guessed) {
    res.json({ msg: "Bigger" });
  }
});
router.post("/restart", (_, res) => {
  genNumber();
  res.json({ msg: "The game is restarted" });
});

export default router;
