const Sequelize = require('sequelize');
const db = require('../db');

const Line = db.define('line', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
});

Line.findByName = async function (name) {
  return await this.findOne({
    where: {
      name
    }
  });
};

module.exports = Line;
