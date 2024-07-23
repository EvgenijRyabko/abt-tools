const personRepo = require("../../repos/persons.repo");
const persTestsRepo = require("../../repos/persons-tests-repo");
const persCardsRepo = require("../../repos/persons-card.repo");
const { logger } = require("../../utils/logger");

const getPersonTests = async (personPin) => {
  const person = await personRepo.findPersonByPIN(personPin);

  if (person) {
    return await persTestsRepo.getAllPersonsTest(person.id);
  }

  throw new Error(`Человек ${personPin} не найден`);
};

const nullifyTests = async (idPersonTests) => {
  const persTest = await persTestsRepo.getPersTestById(idPersonTests);

  if (!persTest) throw "persTests не найден!";

  const newPersTest = {
    pers_id: persTest.pers_id,
    test_id: persTest.test_id,
    pers_event_id: persTest.pers_event_id,
    start_time: persTest.start_time,
  };

  const trx = await knexConnection.transaction();

  try {
    const personCardIds = await persCardsRepo.findAllPersonCardIds(
      persTest.pers_id,
      persTest.test_id
    );

    for (const cardObj of personCardIds) {
      await persCardsRepo.nullifyBallOnExamCard(trx, cardObj.exam_id);
    }

    await persTestsRepo.deletePersTests(trx, idPersonTests);

    await persTestsRepo.createNewPersTests(trx, newPersTest);

    await logger.log(
      `Тест ${persTest.test_id} для персоны ${persTest.pers_id} успешно обнулен!` +
        personCardIds.length >
        0
        ? `Также были обнулены баллы в ${personCardIds.length} направлении(-ях)`
        : "",
      "nullifyTests"
    );

    await trx.commit();
  } catch (err) {
    await trx.rollback();

    throw new Error(err.message || err);
  }
};

module.exports = {
  getPersonTests,
  nullifyTests,
};
