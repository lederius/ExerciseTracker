const express = require('express');
const app = express();
const cors = require('cors');
// const path = require("path");
const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
// const URI = "mongodb://localhost"
require('dotenv').config();
app.use(express.json());
app.use(cors());
const PORT =  3000

mongoose.connect("mongodb://localhost:27017/testPurposes", { useNewUrlParser: true })

let db = mongoose.connection;
db.on("error", console.error.bind(console, " connectin error"));
db.once("open", function(){
console.log(" database is connected to express");
var kittySchema = new mongoose.Schema({
  name: String
});
// above is the schema
var Kitten = mongoose.model("Kitten", kittySchema);
//above is compiling the kitty schema into a Model
//A model is a class with which we construct documents. In this case, each document will be a kitten with properties and behaviors as declared in our schema. Let's create a kitten document representing the little guy we just met on the sidewalk outside:
var silence = new Kitten({name: "Silence"});
console.log(silence.name, "should be Silence");
silence.save()
// NOTE: methods must be added to the schema before compiling it with mongoose.model
kittySchema.methods.speak = function (){
  var greeting = this.name
  ?"Meow name is" + this.name
  : " I don't have a name"
  console.log(greeting);
}
var Kitten = mongoose.model("kitten", kittySchema);
//Functions added to the methods property of a schema get compiled into the Model prototype and exposed on each document instance:
var fluffy = new Kitten({ name: "fluffy"});
fluffy.speak()
//We have talking kittens! But we still haven't saved anything to MongoDB. Each document can be saved to the database by calling its save method. The first argument to the callback will be an error if any occurred.

fluffy.save(function(err, kittens){
if (err) return console.error(err);
fluffy.speak()
})

//Say time goes by and we want to display all the kittens we've seen. We can access all of the kitten documents through our Kitten model.
Kitten.find(function (err, kittens){
if (err) return console.err(err);
console.log(kittens, ":????");
})
//We just logged all of the kittens in our db to the console. If we want to filter our kittens by name, Mongoose supports MongoDBs rich querying syntax.
//Kitten.find({name:/^fluff/}, callback); // original
Kitten.find({name:/^silence/},function(err,kittens){
  if (err) return console.err(err);
  console.log(kittens, "only silence though")
});
//This performs a search for all documents with a name property that begins with "Fluff" and returns the result as an array of kittens to the callback.
})

// let accountSchema = new Schema({
//   username: String,
//   password: String
// })

// let practice = mongoose.model('practice', practiceSchema,)
// let AllenIverson = new practice({title: "Allen Iverson", author: "Himself", body:"Basketball"});
// AllenIverson.save();
// let FrankyFrank = new practice({title: "PCC Lessons", author: "blah blah", body:"coding"});
// FrankyFrank.save();


// console.log(AllenIverson, "???");
// console.log(FrankyFrank, "!!!");


// let newAccounts = mongoose.model('newAccounts', accountSchema)

app.use(function(req,res,next){
  console.log(req.method, req.path,"-",req.ip);
  next();
});

//  app.get("/login", (req, res)=>{

//  }

 app.listen(PORT,(error)=>{
  if(error){
    console.log(error);
    return;
};
console.log(`Listening on port: ${PORT}`)
 })
