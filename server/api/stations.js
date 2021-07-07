const router = require("express").Router();
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const {
  models: { User },
} = require("../db");
const { loggedIn } = require("./gatekeepingMiddleware");
module.exports = router;

// GET /api/stations
router.get("/", async (req, res, next) => {
  try {
    // const id = parseInt(req.user.id);
    const id = 1;
    const user = await User.findByPk(id);
    const stations = await user.getStations();

    const stationIds = stations.map((station) => {
      return station.id;
    });

    const stationsWithLines = await Stations.findAll({
      where: {
        id: {
          [Op.in]: stationIds,
        },
      },
      include: { model: Line },
    });

    res.json(stationsWithLines);
  } catch (err) {
    next(err);
  }
});

// POST /api/stations

// DELETE /api/stations

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
