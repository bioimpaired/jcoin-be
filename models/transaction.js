const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  fromAddress: {
    type: String
  },
  toAddress: {
    type: String,
    required: [true, "toAddress is required"]
  },
  amount: {
    type: String,
    required: [true, "amount is required"]
  },
  timestamp: {
    type: String,
    required: [true, "needs a timestamp"]
  }
});

const Transaction = mongoose.model("transaction", TransactionSchema);

module.exports = {
  TransactionSchema: TransactionSchema,
  Transaction: Transaction
};
