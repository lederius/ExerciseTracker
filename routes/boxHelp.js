const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const PORT =  8000;
const namesometihg = require('file location')

const mongoose = require('mongoose');
const account = require('../database/seeder');
const MongoURI = 'mongodb://127.0.0.1:27017/ExerciseHistory'
mongoose.connect(MongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// mongoose.connect('mongodb://localhost/ExerciseHistory', {useNewUrlParser: true});
const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
  console.log("connected to db")
});
//seedeer goes here

account.deleteMany()
  .then(()=>{
      console.log("cleared db")
  })
account.create(namethosn)
  .then(()=>{
      console.log("seeded db")
  }).catch(err =>{
      console.log(err)
  })
setTimeout(()=>{
    db.close()
}, 1000)