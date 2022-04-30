const routes = require('express').Router();
const connect = require('../db/connect');

routes.get('/', (req, res) => {
    // Get the collection of data from the db
    connect.getCollection().find().toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
        console.log("Contacts have been retrieved");
    });
});

module.exports = routes;