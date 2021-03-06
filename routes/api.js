const express = require("express");
const router = express.Router();
const Address = require("../models/address");
const Transaction = require("../models/transaction");

// an address is a user like a name or email
router.post("/addresses", (req, res) => {
  console.log("creating new user address", req.body.address);
  const address = Address.create({
    address: req.body.address
  }).then(address => {
    res.send(address);
  });
});

// not being used currently
router.get("/addresses", (req, res) => {
  console.log("get all addresses");
  Address.find({}).then(addresses => {
    res.send(addresses);
  });
});

router.get("/addresses/:address", (req, res, next) => {
  const address = req.params.address;
  console.log("at get request", address);
  Address.find({
    address: address
  })
    .then(address => {
      res.send({ address: address });
    })
    .catch(next);
});

// clean this up
router.post("/transactions", (req, res, next) => {
  const toAddress = req.body.toAddress;
  const fromAddress = req.body.fromAddress;
  const amount = parseInt(req.body.amount);
  const date = new Date();
  // add time stamp and update balance
  const transaction = new Transaction.Transaction({
    toAddress: toAddress,
    fromAddress: fromAddress,
    amount: amount,
    timestamp: date.toISOString()
  });
  console.log("posting", req.body);

  // add transaction to toAddress
  Address.findOneAndUpdate(
    { address: toAddress },
    {
      $push: { transactions: transaction }
    }
  )
    .then(a => {
      console.log("toaddress done", a);

      const newBalance = a.balance + amount;
      Address.findOneAndUpdate(
        { address: toAddress },
        {
          $set: { balance: newBalance }
        }
      ).catch(next);
    })
    .catch(next);

  // add transaction to fromAddress
  Address.findOneAndUpdate(
    { address: fromAddress },
    {
      $push: { transactions: transaction }
    }
  )
    .then(a => {
      console.log("fromaddress done", a);

      const newBalance = a.balance - amount;
      Address.findOneAndUpdate(
        { address: fromAddress },
        {
          $set: { balance: newBalance }
        }
      ).catch(next);
      res.send({ status: "OK" });
    })
    .catch(next);
});

module.exports = router;
