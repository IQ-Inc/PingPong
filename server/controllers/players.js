const Player = require('../models').Player;
const Game = require('../models').Game;
const Ledger = require('../models').Ledger;

module.exports = {
  create(req, res) {
    return Player
      .create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        NickName: req.body.NickName
      })
      .then(player => {
        Ledger.create({
          Transaction: 0,
          Description: "",
          PlayerId: player.dataValues.id,
          Active: true
        }).then(ledger => {
          res.status(201).send(player);
        });
      })
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Player
      .findAll()
      .then(players => res.status(200).send(players))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Player
      .findById(req.params.playerId, {
        include: [
        {
          model: Game,
          as: 'GamesWon',
        },
        {
          model: Game,
          as: 'GamesLost'
        }],
      })
      .then(player => {
        if (!player) {
          return res.status(404).send({
            message: 'Player Not Found',
          });
        }
        return res.status(200).send(player);
      })
      .catch(error => res.status(400).send(error));
  },
};