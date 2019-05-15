const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Transaction = require("./transaction");

const AddressSchema = new Schema({
  address: {
    type: String,
    required: [true, "address is required"]
  },
  balance: {
    type: String,
    default: "0"
  },
  transactions: [Transaction.TransactionSchema]
});

const Address = mongoose.model("address", AddressSchema);
module.exports = Address;
