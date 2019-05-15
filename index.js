const express = require("express");
const routes = require("./routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// setup app
const app = express();

// connect to db usergo if doesnt exist makes add the options for mongo 3.1 >
mongoose.connect("mongodb://localhost/usergo", {
  useNewUrlParser: true,
  useFindAndModify: false
});
// y?
mongoose.Promise = global.Promise;
// parse body before checking routes
app.use(bodyParser.json());

//initialize routes
app.use("/api", routes);

// error handler
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

// listen on port
app.listen(process.env.port || 4000, () => {
  console.log("listening for requests");
});
