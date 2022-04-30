const routes = require('express').Router();

routes.get('/', (req, res) => {

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
            res.json(result);
            db.close();
        });
    });
});

module.exports = routes;