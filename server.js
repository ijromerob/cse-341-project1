const express = require('express');
const app = express();
const rootRoute = require('./routes/index');
const port = process.env.PORT || 3000;

app.use('/', rootRoute);

app.listen(port, () => {
  console.log(`App listening in port ${port}`);
});
