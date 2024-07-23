const { knexConnection } = require("../database/knex-connection");

module.exports = {
  getAnswers: async (idPersonTests) => {
    const res = await knexConnection("pers_test_details as ptd")
      .select(
        "ptd.test_id",
        "ptd.quest_text_id",
        "ptd.answer_id",
        knexConnection.raw(`(
	SELECT
		qd.text
	from
		question_details as qd
	where
		qd.quest_id = ptd.quest_id
		and qd.type = 'que'
	LIMIT 1) as question`),
        knexConnection.raw(`(
	SELECT
		qd.text
	from
		question_details as qd
	where
		qd.quest_id = ptd.quest_id
		and qd.type = 'cor'
	LIMIT 1) as correct_answer`),
        knexConnection.raw(`(
	SELECT
		qd.text
	from
		question_details as qd
	where
		qd.id = ptd.answer_id
	LIMIT 1) as abit_answer`)
      )
      .where("ptd.answer_ball", 0)
      .andWhere("ptd.pers_test_id", idPersonTests);

    return res;
  },

  getAllPersonsTest: async (personId) => {
    return await knexConnection("pers_tests as pt")
      .select("pt.id", "t.discipline as name")
      .innerJoin("tests as t", "t.id", "pt.test_id")
      .where({ pers_id: personId });
  },

  getPersTestById: async (ptId) => {
    return await knexConnection("pers_tests as pt").where("id", ptId).first();
  },

  createNewPersTests: async (trx, persTestsObj) => {
    await trx("pers_tests").insert(persTestsObj);
  },

  deletePersTests: async (trx, persTestsId) => {
    await trx("pers_tests").delete().where("id", persTestsId);
  },
};
