const router = require("express").Router();
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const {
  models: { User, Station, Line },
} = require("../db");
const { loggedIn } = require("./gatekeepingMiddleware");
module.exports = router;

// GET /api/stations
router.get("/", async (req, res, next) => {
  try {
    // const userId = parseInt(req.user.id);
    const userId = 1;
    const user = await User.findByPk(userId);
    const stations = await user.getStations();

    const stationIds = stations.map((station) => {
      return station.id;
    });

    const stationsWithLines = await Station.findAll({
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

// POST /api/stations/:stationId
router.post("/:stationId", async (req, res, next) => {
  try {
    // const userId = parseInt(req.user.id);
    const userId = 1;
    const user = await User.findByPk(userId);

    const stationId = parseInt(req.params.stationId);
    const station = await Station.findByPk(stationId);

    await user.addStation(station);

    const stationWithLines = await Station.findByPk(stationId, {
      include: { model: Line },
    });

    res.json(stationWithLines);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/stations/:stationId
router.delete("/:stationId", async (req, res, next) => {
  try {
    // const userId = parseInt(req.user.id);
    const userId = 1;
    const user = await User.findByPk(userId);

    const stationId = parseInt(req.params.stationId);
    const station = await Station.findByPk(stationId);

    await user.removeStation(station);

    const stationWithLines = await Station.findByPk(stationId, {
      include: { model: Line },
    });

    res.json(stationWithLines);
  } catch (err) {
    next(err);
  }
});
