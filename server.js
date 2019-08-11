const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
require("dotenv").config();
const port = process.env.port || 5555;

//connecting mongo db
//
mongoose.Promise = global.Promise;
//connect to mongoose

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//passport initializing
app.use(passport.initialize());


app.get('/', (req,res) => {
  res.send('hello world')
})
//config passport
require("./config/passport")(passport);

//middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));

//parse application json
app.use(bodyParser.json());

//applying routes
const GymFinder = require('./routes/gymfinder')
const Post = require("./routes/posts");
const Auth = require("./routes/userauth");
const Account = require("./routes/Account");
app.use("/", Auth, Post, Account,GymFinder);

app.listen(port, () => {
  console.log(`server is up and runing on ${port} `);
});
