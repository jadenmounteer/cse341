const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Hello Lucy!');
});

module.exports = routes;