const router = require('express').Router();
const { Op } = require('sequelize');
const {
  models: { User, Station, Line },
} = require('../db');
const { loggedIn } = require('./gatekeepingMiddleware');
module.exports = router;

// GET /api/stations
// returns users home/chosen stations
router.get('/', loggedIn, async (req, res, next) => {
  try {
    const userId = parseInt(req.user.id);
    // o: check for when not found, also eager loading
    const user = await User.findByPk(userId);
    const stations = await user.getStations();

    // o: can be made into a one liner
    const stationCodes = stations.map((station) => {
      return station.code;
    });

    const stationsWithLines = await Station.findAll({
      where: {
        code: {
          [Op.in]: stationCodes,
        },
      },
      include: { model: Line },
    });

    // o: maybe do in Sequelize
    const stationsWithSimpleLines = stationsWithLines.map((station) => {
      // for each station, map lines prop to array of line names
      station = station.get({ plain: true });
      station.lines = station.lines.map((line) => line.name);
      return station;
    });

    res.json(stationsWithSimpleLines);
  } catch (err) {
    next(err);
  }
});

// POST /api/stations/:stationCode
router.post('/:stationCode', loggedIn, async (req, res, next) => {
  try {
    const userId = parseInt(req.user.id);
    // o: check for when not found
    const user = await User.findByPk(userId);

    const stationCode = req.params.stationCode;
    const station = await Station.findOne({
      where: {
        code: stationCode,
      },
    });

    await user.addStation(station);
    const lines = await station.getLines();
    await user.addLines(lines);

    const stationWithLines = await Station.findOne({
      where: {
        code: stationCode,
      },
      include: { model: Line },
    });

    res.json(stationWithLines);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/stations/:stationCode
router.delete('/:stationCode', loggedIn, async (req, res, next) => {
  try {
    const userId = parseInt(req.user.id);
    const user = await User.findByPk(userId);

    const stationCode = req.params.stationCode;
    const station = await Station.findOne({
      where: {
        code: stationCode,
      },
    });

    const lines = await station.getLines();
    await user.removeLines(lines);
    await user.removeStation(station);

    const stationsLeft = await user.getStations();
    await Promise.all(
      stationsLeft.map(async (station) => {
        const linesLeft = await station.getLines();
        await user.addLines(linesLeft);
      })
    );

    const stationWithLines = await Station.findOne({
      where: {
        code: stationCode,
      },
      include: { model: Line },
    });

    res.json(stationWithLines);
  } catch (err) {
    next(err);
  }
});
