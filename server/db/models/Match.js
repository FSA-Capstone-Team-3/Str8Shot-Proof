const Sequelize = require("sequelize");
const db = require("../db");

const Match = db.define("match", {
  user1_status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  user2_status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Match;
