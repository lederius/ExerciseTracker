const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const PORT = 8000;
const mongoose = require("mongoose");
const User = require("../database/seeder"); // the user schema
const MongoURI = "mongodb://127.0.0.1:27017/ExerciseHistory";

// mongoose.connect(MongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.once("open", () => {
  console.log("connected to db");

  app.use(function (req, res, next) {
    console.log(req.method, req.path, " on port", PORT);
    next();
  });
  app.route("/").post((req, res) => {
    // not doing what i want.
    // trying to get array of collections to appear
    console.log("POST request is being made on route/");
    let username = req.headers.loginuser;
    let password = req.headers.password;
    console.log( { username: username}, "should be users input");

    User.findOne({ username: username}, function (err, users) {
        console.log(users, "users in the account ");
        if (err) return console.err(err);
        if(users != null){
            if(users.password === password){
                res.json({ status: "logged in", account: users });
            }else{
                res.json({ status: "password doesn't match", account: null });
            }
        } else{
            res.json({
                    status: "not logged in",
                    account: null,
                  });
        }

        // if (users) {
        //   console.log("found match");
        //   res.json({ status: "logged in", account: users });
        // } else {
        //   console.log("found no match");
        //   res.json({
        //     status: "not logged in",
        //     account: null,
        //   });
        // }
   
      })
      .catch((err) => console.log(err, "Loggin in"));
  });

  app.route("/create-account").post((req, res) => {
    console.log("creating account");
    let username = req.headers.username;
    let password = req.headers.password;
    let query = { name: username, password: password };
    User.findOne(query, function (err, users) {
        console.log("in find function");
        console.log(users, "the users in findOne of create-account")
        console.log(query, "the user being searched")
        // for some reason some searches arent being found 
      if (err) return console.err(err);
      if (users === null) {
        let newUser = new User({
          username,
          password,
          activity: [],
        });
        console.log(newUser, "new user created")
        newUser.save()          
          .then((save) => {
            console.log("user created");
            res.send({ status: "Success", newAccount: newUser });
          })
          .catch((err) => console.log(err, "In saving new users"));
      } else {
        res.send({ status: "Failed" });
        console.log("user name taken");
      }
    });
  });
  app.route("/exercises").put((req, res) => {
    console.log(req.body.account, "the username being looked up")
    let workOut = req.body.exercise;
    console.log("in the exercise path ")
    User.findOne({ username: req.body.account.username}, function (err, user) {
        console.log(user, "insdide the findone method")
      if (err) return console.err(err);
      console.log(user, "before!!!!!!!");
      user.activity.push({
        exercise: workOut[0],
        time: workOut[1],
        date: workOut[2],
      });
      console.log(user, "after the push method");
      //Need to get to save update
      user.save();
      res.send({ 
        status:"exercises updated",  
        account: user.activity});
    });
  });
// });
// const Accounts = db.collection("users")
// the database and collection are called in the callback of the connect in order for them to be properly connected
// console.log(Accounts, "???")
  app.route("/history").post((req, res) =>{
    console.log(req.body);
    console.log(req.body["userId"], "should be the user id number");
    let idNumber =  req.body["userId"];
    User.findOne({"_id":idNumber}, function (err, users) {
      if (err) return console.err(err);
      if(users != null){
        let activities = users.activity;
        res.json({status:"success", userId:idNumber, activity:activities});  
      } else res.json({status:"failed"});
    })   
  })

  app.route("/update").patch((req, res)=>{
      console.log("patch route working")
      console.log(req.body, "should be body")
      let idNumber = req.body["userId"]
      let activityId = req.body["activityId"]
      let time = req.body["time"]
      let name = req.body["name"]
      let date = req.body["date"]
      console.log(idNumber,"idNumber", activityId,"activityId", time,"time", name,"name", date,"date", "should be 5 values")
      User.findOne({"_id":idNumber}, function(err, user){
        if (err) return console.err(err);
        if(user == null){
          res.json({
            status:"update failed"
          }) 
        };
        console.log(user, "the user before if")
        if(user != null){
        let activities = user.activity.id(activityId);
        console.log(activities, "activity being worked on")
        activities["exercise"] = name;
        activities["time"] = time;
        activities["date"] = date;
        console.log(activities, "after change")
        user.save(function(err, results){
          if (err) return console.err(err)
          console.log(results, "the results")
          res.json({
            status:"update changed", activity:results
          })          
        })
      }
      console.log("end of patch")
    })
  })


  app.route("/delete").delete((req,res)=>{
    console.log("delete route working")
    console.log(req.body, "should be body")
    let idNumber = req.body["userId"]
    let activityId = req.body["activityId"]
    User.findById(idNumber, function(err, results){
      if (err) return console.err(err)
      console.log(results, "the results in the find")
      results.activity.pull(activityId)
      // results.activity.findById(activityId)
      // .save(function (err, results){
      //   if (err) return console.err(err)
      results.save()
        res.json({
          status:"deleted",
          activity:results 
        })
      // })
    })
  })

app.listen(PORT, () => {
  console.log("the server is working on port", PORT);
});
