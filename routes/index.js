const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Hello everyone!');
});

module.exports = routes;