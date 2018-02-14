const Game = require('../models').Game;

module.exports = {
  create(req, res) {
    return Game
      .create({
        WinnerId: req.body.WinnerId,
        LoserId: req.body.LoserId,
        WinnerScore: req.body.WinnerScore,
        LoserScore: req.body.LoserScore,
        IsTournamentGame: req.body.IsTournamentGame,
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