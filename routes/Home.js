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
  const users = db.collection("users")
  // the database and collection are called in the callback of the connect in order for them to be properly connected

app.use(function(req,res,next){
  console.log(req.method, req.path," on port",PORT);
  next();
});

app.route("/")
.post((req,res)=>{
  // not doing what i want.
  // trying to get array of collections to appear
    console.log("POST request is being made");
    let username = req.headers.loginuser;
    let password = req.headers.password;

    console.log(users.find().pretty(), "???")

    res.json({name: "idjk", password:'google'})

})


  app.listen(PORT,()=>{
    console.log("the server is working on port", PORT)
})
});