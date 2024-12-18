const express = require('express');
const app = express();
const rootRoute = require('./routes/index');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3000;

// To check if there is a problem with promises
process.on('unhandledRejection', (error) => {
  throw error;
});

// Handling uncaught exceptions
process.on('uncaughtException', (error) => {
  console.log(error);
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested with, Content-Type, Accept, Z-Key'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/', rootRoute);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running on port ${port}`);
    });
  }
});
