//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Station = require('./models/Station');
const Line = require('./models/Line');

//associations could go here!

Station.belongsToMany(Line, { through: 'line_station' });
Line.belongsToMany(Station, { through: 'line_station' });

Station.belongsToMany(User, { through: 'user_station' });
User.belongsToMany(Station, { through: 'user_station' });

Line.belongsToMany(User, { through: 'user_line' });
User.belongsToMany(Line, { through: 'user_line' });

User.belongsToMany(User, {
  through: "matches",
  as: 'requestor',
  foreignKey: 'requestee_id',
});
User.belongsToMany(User, {
  through: "matches",
  as: 'requestee',
  foreignKey: 'requestor_id',
});

module.exports = {
  db,
  models: {
    User,
    Station,
    Line,
  },
};
