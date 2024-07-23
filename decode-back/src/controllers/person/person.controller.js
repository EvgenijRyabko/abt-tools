const personService = require("../../services/person/person.service");
const { logger } = require("../../utils/logger");

const getPersonAnswers = async (req, res) => {
  const idPersonTests = req.params.id;

  if (!idPersonTests) res.status(400).send("ptId was not provided!");

  try {
    const result = await personService.getPersonAnswers(idPersonTests);

    res.status(200).send(result);
  } catch (err) {
    await logger.error(err.message || err, `getAnswers`);

    res.status(500).send(err.message || err);
  }
};

module.exports = {
  getPersonAnswers,
};
