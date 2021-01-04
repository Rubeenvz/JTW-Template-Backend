"use strict";

const dotEnv = require('dotenv').config();
const mongoose = require("mongoose");

const connect = new Promise((resolve, reject) => {
  console.debug("\nTrying to connect to DB [ " + process.env.DB_HOST + " ]\n");
  mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.debug("\nConnection to DB done successfully =)" + "\n");
    resolve();
  })
  .catch((error) => {
    reject(error);
  });
});

module.exports = { connect };
