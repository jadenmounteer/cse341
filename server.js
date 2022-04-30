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


// Ugly code
const dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB (Brother Lyon's way)
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;
    var dbo = db.db("contacts");
    dbo.collection("contacts").find().toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});

