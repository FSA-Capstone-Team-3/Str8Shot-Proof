const router = require("express").Router();
const { Op } = require("sequelize");
const {
  models: { User, Line, Station },
} = require("../db");
// const { loggedIn } = require;
module.exports = router;

// GET /api/connections/
router.get("/", async (req, res, next) => {
  try {
    // const userId = parseInt(req.user.id);
    const userId = 2;
    const loggedInUser = await User.findByPk(userId);
    const userLines = await loggedInUser.getLines();

    const userLineNames = userLines.map((line) => line.name);

    const connectionsIds = [];
    // Map over lines array to find corresponding users
    for (let i = 0; i < userLines.length; i++) {
      const usersOnLine = await userLines[i].getUsers();

      const filteredUsers = usersOnLine.filter((user) => {
        // Is the user the logged in user, if so ignore
        if (user.id !== userId) return true;
      });

      for (let j = 0; j < filteredUsers.length; j++) {
        connectionsIds.push(filteredUsers[j].id);
      }
    }

    // Filter connectionsArr to remove duplicate user objects
    const filteredIds = connectionsIds.filter(
      (value, index) => connectionsIds.indexOf(value) === index
    );

    const connectionsObjects = await User.findAll({
      where: {
        id: {
          [Op.in]: filteredIds,
        },
      },
      include: [
        {
          model: Station,
          include: { model: Line, where: { name: { [Op.in]: userLineNames } } },
        },
      ],
    });

    res.json(connectionsObjects);
  } catch (err) {
    next(err);
  }
});
