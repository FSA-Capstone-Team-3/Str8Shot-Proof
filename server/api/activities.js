const router = require('express').Router();
const { loggedIn } = require('./gatekeepingMiddleware');
module.exports = router;
const yelp = require('yelp-fusion');
require('dotenv').config();

const yelpKey = process.env.YELP_API_KEY;

const client = yelp.client(yelpKey);

// GET /api/activities
router.get('/', loggedIn, async (req, res, next) => {
  try {
    const { lat, long } = req.query;
    const response = await client.search({
      latitude: `${lat}`,
      longitude: `${long}`,
      radius: `400`
    });
    res.json(response.jsonBody.businesses);
  } catch (err) {
    next(err);
  }
});
