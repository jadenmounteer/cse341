const mongoose = require('mongoose');

// The connection string
const URI = "mongodb+srv://the1shortguyfromRFM:W0oi01G2vHrodj8t@cluster0.sfayv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Connect to the database
const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('Successfully connected to database!');
}

module.exports = connectDB;