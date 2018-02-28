const Wager = require('../models').Wager;

module.exports = {
  create(req, res) {
    return Wager
      .create({
        BettorId: req.body.BettorId,
        WinnerId: req.body.WinnerId,
        LoserId: req.body.LoserId,
        WinnerScore: req.body.WinnerScore,
        LoserScore: req.body.LoserScore,
        IsTournamentWager: req.body.IsTournamentWager,
      })
      .then(Wager => res.status(201).send(Wager))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Wager
      .findAll()
      .then(Wagers => res.status(200).send(Wagers))
      .catch(error => res.status(400).send(error));
  },
};