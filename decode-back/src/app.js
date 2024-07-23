const express = require("express");
const cors = require("cors");
const { getAnswers } = require("./controllers/abt-answers.controller");
const he = require("he");

const app = express();

app.use(cors());

app.get("/api/answers/:id", async (req, res) => {
  const idPersonTests = req.params.id;

  if (!idPersonTests) res.status(400).send("ptId was not provided!");

  const answers = await getAnswers(idPersonTests);

  const pAnswers = answers.map((el) => ({
    question: he.decode(el.question).replace(/(\<(\/?[^>]+)>)/g, ""),
    correct: he.decode(el.correct_answer).replace(/(\<(\/?[^>]+)>)/g, ""),
    abit: he.decode(el.abit_answer).replace(/(\<(\/?[^>]+)>)/g, ""),
  }));

  res.status(200).send(pAnswers);
});

module.exports = app;
