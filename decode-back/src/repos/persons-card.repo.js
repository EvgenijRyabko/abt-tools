const { knexConnection } = require("../database/knex-connection");

module.exports = {
  findAllPersonCardIds: async (persId, testId) => {
    return await knexConnection("abit_examCard as excar")
      .select(
        "excar.id as exam_id",
        "pers.id as pers_id",
        "t.id as test_id",
        "pred.name",
        "excar.ball",
        "af.nick",
        "formOb.name",
        "lev.name",
        "gr.id as group_id",
        "gr.name"
      )
      .innerJoin("abit_statements as state", "state.id", "excar.state_id")
      .innerJoin("persons as pers", "pers.id", "state.person_id")
      .innerJoin("abit_examenGroup as exgr", "exgr.id", "excar.exam_id")
      .innerJoin("abit_predmets as pred", "pred.id", "exgr.predmet_id")
      .innerJoin("abit_group as gr", "gr.id", "exgr.group_id")
      .innerJoin("abit_facultet as af", "af.id", "gr.fk_id")
      .innerJoin("abit_stlevel as lev", "lev.id", "gr.st_id")
      .innerJoin("abit_formObuch as formOb", "formOb.id", "gr.fo_id")
      .innerJoin("tests as t", "t.id", "pred.test_id")
      .where("pers.id", persId)
      .andWhere("t.id", testId);
  },

  nullifyBallOnExamCard: async (trx, examCardId) => {
    await trx("abit_examCard").update({ ball: null }).where("id", examCardId);
  },
};
