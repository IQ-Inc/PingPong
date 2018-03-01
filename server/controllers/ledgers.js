const Ledger = require('../models').Ledger;

module.exports = {
  create(req, res) {
    return Ledger
      .create({
        Transaction: req.body.Transaction,
        Description: req.body.Desription,
        PlayerId: req.body.PlayerId
      })
      .then(Ledger => res.status(201).send(Ledger))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Ledger
      .findAll()
      .then(Ledgers => res.status(200).send(Ledgers))
      .catch(error => res.status(400).send(error));
  },
};