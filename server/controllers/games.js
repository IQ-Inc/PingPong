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

  list(req, res) {
    return Game
      .findAll()
      .then(games => res.status(200).send(games))
      .catch(error => res.status(400).send(error));
  },
};