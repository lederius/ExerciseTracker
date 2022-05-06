const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const PORT =  8000;

const { MongoClient } = require('mongodb');
const URI = 'mongodb://localhost:27017';
const client = new MongoClient(URI,{useUnifiedTopology:true,useNewUrlParser:true});

client.connect(()=>{

const db = client.db("ExerciseTracker")
const Accounts = db.collection("users")
// the database and collection are called in the callback of the connect in order for them to be properly connected

console.log(Accounts,"???")
app.use(function(req,res,next){
  console.log(req.method, req.path," on port",PORT);
  next();
});
app.route("/")
.post((req,res)=>{
  // not doing what i want.
  // trying to get array of collections to appear
  console.log("POST request is being made on route/");
  let username = req.headers.loginuser;
  let password = req.headers.password;
  let query = {name: username, password:password}

  Accounts.find(query).toArray(function(err,users){
    if (err) return console.err(err);
    if(users.length == 1){
      res.json({status: "logged in",account: users})
    } else res.json({
      status: "not logged in",
      account: null
    })
  })
});

app.route("/create-account")
.post((req,res)=>{
  console.log("creating account")
  let username = req.headers.newuser;
  let password = req.headers.password;
  let query = {name: username, password:password}
  console.log(query, "the values")
  Accounts.find(query).toArray(function(err,users){
    console.log("in find function")
    if (err) return console.err(err);
      console.log(users, users.length)
    if(users.length != 0){
        res.send({status: "Failed"})
        console.log("user name taken")
    } else {
        Accounts.insertOne(query)
        console.log("user created")
        res.send({status:"Success"})
    }
  })
})
app.route("/exercises")
  .put((req,res)=>{
    let username = req.body.account.name;
    let password = req.body.account.password;
    let query = {name: username, password:password}  
    let workOut = req.body.exercise
    Accounts.find(query).toArray(function(err,users){
      if (err) return console.err(err);
      if(users.length == 1){
        console.log(users,"before")
        users[0].activity.push({exercise:workOut[0],time:workOut[1],date:workOut[2]})
        console.log(users, "after the push method")
        //Need to get to save update
        Accounts.save(users[0])
      }
    });
    res.send({exercise: "came over correct"})
  })
app.listen(PORT,()=>{
  console.log("the server is working on port", PORT)
})
})