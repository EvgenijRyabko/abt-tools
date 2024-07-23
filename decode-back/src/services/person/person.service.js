const he = require("he");

const { getAnswers } = require("../../repos/persons-tests-repo");

const getPersonAnswers = async (idPersonTests) => {
  const answers = await getAnswers(idPersonTests);

  return answers.map((el) => ({
    question: he.decode(el.question).replace(/(\<(\/?[^>]+)>)/g, ""),
    correct: he.decode(el.correct_answer).replace(/(\<(\/?[^>]+)>)/g, ""),
    abit: he.decode(el.abit_answer).replace(/(\<(\/?[^>]+)>)/g, ""),
  }));
};

module.exports = {
  getPersonAnswers,
};
