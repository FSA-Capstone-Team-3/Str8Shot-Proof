const router = require('express').Router();
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const {
  models: { User },
} = require('../db');
const { loggedIn } = require('./gatekeepingMiddleware');
module.exports = router;

// POST /api/matches/:userId
router.post('/:userId', loggedIn, async (req, res, next) => {
  try {
    const requestorUserId = parseInt(req.user.id);
    const requesteeUserId = parseInt(req.params.userId);

    const requestor = await User.findByPk(requestorUserId);
    const requestee = await User.findByPk(requesteeUserId);

    await requestor.addRequestee(requestee);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
