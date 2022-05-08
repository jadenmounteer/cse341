const mongoose = require('mongoose');

// The Contacts Schema (describes the way the data looks)
const ContactsSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  favoriteColor: String,
  birthday: String,
});

module.exports = mongoose.model('contacts', ContactsSchema);
