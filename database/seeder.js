const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ExerciseHistory", {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.once("open", function () {
  console.log("connected to db for seeders");
});

const exerciseSchema = new mongoose.Schema({
  exercise: String,
  time: Number,
  date: Date,
});
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  activity: [exerciseSchema],
});
const User = mongoose.model("User", userSchema);

User.deleteMany().then(() => {
  console.log("cleared db");
});

const template = new User({
  username: "test",
  password: "test",
  activity: [{ exercise: "Running", time: 45, date: 2021 - 05 - 21 }],
});
console.log(template, "works");

template.save().then((seeder) => console.log(seeder, "saved objects"));

// setTimeout(() => {
//   //idk why i need this
//   //need timeout so info can be used
//   console.log("closing db for seeders");
//   db.close();
// }, 2000);

module.exports = User;
