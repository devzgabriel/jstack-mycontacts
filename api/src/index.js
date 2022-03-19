const express = require('express');
const routes = require('./routes');
require('express-async-errors');

const app = express();
app.use(express.json());
app.use(routes);
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Internal server error');
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
