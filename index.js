'use strict';

const dbConnection = require('./dbConnection');
const dotEnv = require('dotenv').config();
const app = require('./app');

var isDBConnectionSuccessfully = false;
dbConnection.connect
  .then(() => {
    isDBConnectionSuccessfully = true;
  })
  .catch((error) => {
    isDBConnectionSuccessfully = false;
    console.log(error);
  });

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'The backend is running',
    statusDB: isDBConnectionSuccessfully
      ? 'The DB is successfully connected'
      : 'There is no connection to DB',
  });
});
