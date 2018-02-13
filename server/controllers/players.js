const Player = require('../models').Player;

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
};