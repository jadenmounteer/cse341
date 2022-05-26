const routes = require('express').Router();
const connect = require('../db/connect');
const contactsSchema = require('../models/contacts');
const ObjectId = require('mongodb').ObjectId; // This is so we can query by the db ID
const { validationResult } = require('express-validator');
const { createContactValidation } = require('../validation');

// Returns all the contacts
routes.get('/', (req, res) => {
  // Get the collection of data from the db
  const results = connect.getCollection().find();

  // Make the results into an array
  results.toArray().then((documents) => {
    res.status(200).json(documents);
    console.log('Returned all contacts');
  });
});

// Gets a contact by a specific ID
routes.get('/:id', (req, res) => {
  // Get the ID from the request
  const contactId = new ObjectId(req.params.id);

  // Get the collection of data from the db that matches the contactId
  const results = connect.getCollection().find({ _id: contactId });

  // Make the results into an array
  results.toArray().then((documents) => {
    res.status(200).json(documents[0]); // Grab a single object
    console.log(`Returned Contact ${req.params.id}`);
  });
});

// Creates a new contact in the database
// Returns the new contact ID in the response body
routes.post('/', createContactValidation, (req, res) => {
  // Get any errors
  const errors = validationResult(req);

  if (errors) {
    // Send the errors to the view
    res.status(422).send(errors.array());
  }
  connect.getCollection().insertOne(req.body, (error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(result.insertedId);
  });
});

// Updates a contact based on a given id
routes.put('/:id', createContactValidation, (req, res) => {
  // See if we have all of the info to update with
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.favoriteColor ||
    !req.body.birthday
  ) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  // Get any errors
  const errors = validationResult(req);

  if (errors) {
    // Send the errors to the view
    res.status(422).send(errors.array());
  }

  // Get the id from the request
  const contactId = new ObjectId(req.params.id);

  connect
    .getCollection()
    .updateOne(
      { _id: contactId },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          favoriteColor: req.body.favoriteColor,
          birthday: req.body.birthday,
        },
      }
    )
    .then(() => {
      return res.status(200).send({
        message: 'Successfully updated document',
      });
    });
});

// deletes a contact
routes.delete('/:id', (req, res) => {
  const contactId = new ObjectId(req.params.id);
  connect
    .getCollection()
    .deleteOne({ _id: contactId })
    .then(() => {
      return res.status(200).send({
        message: 'Successfully deleted document',
      });
    });
});

module.exports = routes;
