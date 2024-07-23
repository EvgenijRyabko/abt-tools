const persTestsService = require("../../services/person-tests/person-tests.service");
const { logger } = require("../../utils/logger");

const getPersonTests = async (req, res) => {
  const personPin = req.body.PIN;

  if (!personPin) res.status(400).send("Вы не указали ПИН студента!");

  try {
    const result = await persTestsService.getPersonTests(personPin);

    res.status(200).send(result);
  } catch (err) {
    await logger.error(err.message || err, "getAnswers");

    res.status(500).send(err.message || err);
  }
};

const nullifyTests = async (req, res) => {
  const idPersonTests = req.params.id;

  if (!idPersonTests) res.status(400).send("Ошибка, идентификатор не указан!");

  try {
    await persTestsService.nullifyTests(idPersonTests);

    res.status(200).send("Успех!");
  } catch (err) {
    await logger.error(err.message || err, "nullifyTests");

    res.status(500).send(err.message || err);
  }
};

module.exports = {
  getPersonTests,
  nullifyTests,
};
