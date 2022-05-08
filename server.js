const express = require('express');
const bodyParser = require('body-parser'); // So we can parse JSON data
const app = express();

app.use(bodyParser.json()); // So we can parse JSON data that comes in from POSTs

// Configure the port we will want to listen on
const port = process.env.PORT || 3000;

// Initialize the database
const connection = require('./db/connect');
connection.initDatabase();

// Routing
app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
