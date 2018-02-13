const Game = require('../models').Game;

module.exports = {
  create(req, res) {
    return Game
      .create({
        ...req.body
      })
      .then(game => res.status(201).send(game))
      .catch(error => res.status(400).send(error));
  },
};