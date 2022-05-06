const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(express.json());
app.use(cors());
const PORT =  3001;

const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/ExerciseTracking", { useNewUrlParser: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, " connectin error"));
//turns connection and will notify if there is an error
// below is the function that works with database
function createUser(name,password){
  console.log(" database is connected to express");
  let accountSchema = new mongoose.Schema({
      userName: String,
      password: String
  });
  // above is the schema for all accounts;
  var Accounts = mongoose.model("Accounts", accountSchema);
  //the 'collection' is now declared as 'Accounts'
  let newUser = new Accounts({
    userName: name,
    password: password
  });
  newUser.save();
  Accounts.find(function(err, users){
    if(err) return console.err(err);
    console.log("all users", users);
  })
  Accounts.find({userName:`/${name}/`}, function(err, user){
    if (err) return console.err(err);
    console.log("user(s) with the same name as ",name, user )
  });
  //This performs a search for all documents with a name property that is the name parameter and returns the result as an array of user(s) to the callback.
  setTimeout(()=>{
    //idk why i need this 
    //need timeout so info can be used
    db.close()
  }, 2000)
}
db.once("open",createUser);

export default createUser;

