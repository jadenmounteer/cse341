const routes = require('express').Router();
const connect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; // This is so we can query by the db ID

routes.get('/', (req, res) => {
    // Get the collection of data from the db
    const results = connect.getCollection().find()
    
    // Make the results into an array
    results.toArray().then((documents) => {
        res.status(200).json(documents);
        console.log("Returned all contacts");
    });
    
});

routes.get('/:id', (req, res) => {

    // Get the ID from the request
    const contactId = new ObjectId(req.params.id);

    // Get the collection of data from the db that matches the contactId
    const results = connect.getCollection().find({_id: contactId})
    
    // Make the results into an array
    results.toArray().then((documents) => {
        res.status(200).json(documents[0]); // Grab a single object
        console.log(`Returned Contact ${req.params.id}`);
    });
    
});

module.exports = routes;