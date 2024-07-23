const { knexConnection } = require("../database/knex-connection");

module.exports = {
  findPersonByPIN: async (PIN) => {
    return await knexConnection("persons").where({ PIN }).first();
  },
};
