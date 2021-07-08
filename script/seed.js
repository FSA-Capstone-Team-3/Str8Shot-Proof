"use strict";
// const stationsJson = require('./data/subway_lines.geojson');
const fs = require("fs");
const {
  db,
  models: { User, Line, Station },
} = require("../server/db");

const stationsParsed = JSON.parse(
  fs.readFileSync("script/data/subway_stops.geojson", "utf8")
);

// console.log('sparsed = ', stationsParsed);
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  console.log(`seeded ${users.length} users`);

  const lines = await Promise.all([
    Line.create({ name: "1" }),
    Line.create({ name: "2" }),
    Line.create({ name: "3" }),
    Line.create({ name: "4" }),
    Line.create({ name: "5" }),
    Line.create({ name: "6" }),
    Line.create({ name: "7" }),
    Line.create({ name: "A" }),
    Line.create({ name: "B" }),
    Line.create({ name: "C" }),
    Line.create({ name: "D" }),
    Line.create({ name: "E" }),
    Line.create({ name: "F" }),
    Line.create({ name: "G" }),
    Line.create({ name: "J" }),
    Line.create({ name: "L" }),
    Line.create({ name: "M" }),
    Line.create({ name: "N" }),
    Line.create({ name: "Q" }),
    Line.create({ name: "R" }),
    Line.create({ name: "S" }),
    Line.create({ name: "W" }),
    Line.create({ name: "Z" }),
  ]);
  console.log(`seeded ${lines.length} lines`);

  for (let station of stationsParsed.features) {
    const { stop_id, stop_name, stop_lat, stop_lon, trains } =
      station.properties;

    // creating stations
    const newStation = await Station.create({
      name: stop_name,
      code: stop_id,
      latitude: stop_lat,
      longitude: stop_lon,
    });

    if (trains.split(" ").length > 1) {
      trains.split(" ").forEach(async (train) => {
        const lineToAssign = await Line.findByName(train);
        await newStation.addLine(lineToAssign);
      });
    } else {
      const lineToAssign = await Line.findByName(trains);
      await newStation.addLine(lineToAssign);
    }
  }

  // Associate Stations and Lines with Users for Dummy Data
  const unionsquareStation = await Station.findByPk(214);
  const columbusCircleStation = await Station.findByPk(162);
  await users[0].addStation(unionsquareStation);
  await users[0].addStation(columbusCircleStation);
  const unionsquareLines = await unionsquareStation.getLines();
  await users[0].addLines(unionsquareLines);
  const columbusCircleLines = await columbusCircleStation.getLines();
  await users[0].addLines(columbusCircleLines);

  const queensboroughStation = await Station.findByPk(405);
  await users[1].addStation(queensboroughStation);
  const queensboroughLines = await queensboroughStation.getLines();
  await users[1].addLines(queensboroughLines);

  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
