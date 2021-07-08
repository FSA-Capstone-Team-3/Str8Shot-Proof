const router = require("express").Router();
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const {
  models: { User },
} = require("../db");
const { loggedIn } = require;
