const Player = require('../models').Player;
const Game = require('../models').Game;

module.exports = {
  create(req, res) {
    return Player
      .create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        NickName: req.body.NickName
      })
      .then(player => res.status(201).send(player))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Player
      .findAll({
        include: [{
          model: Game,
          as: 'games',
        }],
      })
      .then(players => res.status(200).send(players))
      .catch(error => res.status(400).send(error));
  },
};