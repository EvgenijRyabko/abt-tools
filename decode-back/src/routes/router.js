const { getPersonAnswers } = require("../controllers/person/person.controller");
const {
  getPersonTests,
  nullifyTests,
} = require("../controllers/persons-tests/persons-tests.controller");

const router = require("express").Router();

router.get("/answers/:id", getPersonAnswers);

router.post("/person/tests", getPersonTests);

router.delete("/test/nullify/:id", nullifyTests);

module.exports = router;
