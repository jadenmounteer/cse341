const express = require('express');
//const connectDB = require('./connections/Connection');
const app = express();

// Connect to the database
//connectDB();

// Configure the port we will want to listen on
const port = process.env.PORT || 3000;

// Routing
app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});




