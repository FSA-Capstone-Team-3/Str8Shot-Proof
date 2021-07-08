const router = require("express").Router();
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const {
  models: { User, Match },
} = require("../db");
const { loggedIn } = require("./gatekeepingMiddleware");
module.exports = router;

// POST /api/matches/:userId
router.post("/:userId", async (req, res, next) => {
  try {
    // const requestingUserId = parseInt(req.user.id);
    const requestorUserId = 2;
    const requesteeUserId = parseInt(req.params.userId);

    const requestor = await User.findByPk(requestorUserId);
    const requestee = await User.findByPk(requesteeUserId);

    // If there is an existing match, that means the requested user is already listed as user1_id in the Match join table
    const existingMatch = await Match.findOne({
      where: {
        user1_id: requesteeUserId,
        user2_id: requestorUserId,
      },
    });

    // If existingMatch is defined, set requesting user to user2_id, and mark user2_status as "true"
    if (existingMatch) {
      await existingMatch.update({
        user2_status: true,
      });
      res.json(existingMatch);
      // Otherwise, set requesting user to user1_id, and mark user1_status as "true" and user2_status as "false"
    } else {
      await requestor.addRequestee(requestee);

      const newMatch = await Match.findOne({
        where: {
          user1_id: requestorUserId,
          user2_id: requesteeUserId,
        },
      });

      await newMatch.update({
        user1_status: true,
        user2_status: false,
      });

      res.json(newMatch);
    }
  } catch (err) {
    next(err);
  }
});
