const Wager = require('../models').Wager;

module.exports = {
  create(req, res) {
    return Wager
      .create({
        BettorId: req.body.BettorId,
        WinnerId: req.body.WinnerId,
        LoserId: req.body.LoserId,
        Amount: req.body.Amount,
        Odds: req.body.Odds
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