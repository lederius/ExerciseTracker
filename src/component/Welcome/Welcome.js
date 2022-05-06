import $ from "jquery";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useEffect } from "react"
import{ Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Index.css"

function Welcome(){
    let store = useSelector(state => state)
    let loggedIn = useSelector(state => state.loggedIn.status);
    
    const ExercisesObj = [
      {Sports : 
        [
          {
            title : "Basketball",
            image : "ExercisePhotos/basketball.jpg",
            time : 60
          },
          {
            title : "Badminton",
            image : "ExercisePhotos/badminton.jpg",
            time : 60
          },
          {
            title : "Dodgeball",
            image : "ExercisePhotos/dodgeball.jpg",
            time : 90
          },
          {
            title : "Dancing",
            image : "ExercisePhotos/dancing.jpg",
            time : 45
          }             
        ]
      },
      {Cardio : 
        [
          {
            title : "Cycling",
            image : "ExercisePhotos/cycling.jpg",
            time : 30
          },
          {
            title : "Walking",
            image : "ExercisePhotos/walking.jpg",
            time : 60
          },
          {
            title : "Jogging",
            image : "ExercisePhotos/jogging.jpg",
            time : 45
          },
          {
            title : "running",
            image : "ExercisePhotos/running.jpg",
            time : 30
          }       
        ]
      } 
    ];
    const exer = ()=>{
      
      for(let a = 0; a < ExercisesObj.length; a++){ 
        let catergory = Object.keys(ExercisesObj[a]).toString();
        console.log(catergory, "the catergory", "loop number", a)
        let listings = Object.values(ExercisesObj[a])[0];
        console.log(listings, "the listis", "loop number", a)
        // console.log(listings, "listings")
        // console.log(catergory, "catergory")
        $(`<div id=${catergory}><h3>${catergory}</h3></div>`).appendTo("#exercise-container");
        $(`#${catergory}`).addClass('dropdownButton');
        $(`#${catergory}`).click(function(){
          $("div[id^=activity]").hide()
          $(this).children().show()
        });
        for(let x in listings){
          let activity = Object.values(listings[x])[0]
          let image = Object.values(listings[x])[1]
          let time = Object.values(listings[x])[2]
          let d = new Date();
          // let date = d.toLocaleDateString()
          $(`<div id=activity-${activity}><img src=${image} id=${activity}-image><p>We recommend ${time} mins for ${activity} </p></div>`).appendTo(`#${catergory}`);
          $("div[id^=activity]").hide();
          $(`img[id$='-image']`).css("border-radius", "8px");
          $(`#modal-${activity}`).hide();
          $(`#activity-${activity}`).click(function(){
            $("#modal-activity").hide();
            $("#modal-activity").show();
            $("#theActivity").val(`${activity}`);
            $("#timeLength").val(`${time}`);
            // $("#theDate").val(`${date}`);
            $("#exit").html(`&times`)
            $("#modal-image").attr("src", `${image}`)
          });
        }
      }
      $("#submitExercise").click(addExercise);
      $("#exit").click(function(){
        console.log("click funcitn is working")
        // $(".Modals").css("display","none")
        $("div[id^='modal-']").hide()
      })
    };
    function addExercise(e){
      // error with the prevent default
      // did not need this function in the useEffect hook
     e.preventDefault()
     console.log("the name", store.currentUser.currentAccount.username)
     let exerciseName = $("#theActivity").val();
     let exerciseTime = $("#timeLength").val();
     let exerciseDate = $("#theDate").val();
     console.log(exerciseName, exerciseTime, exerciseDate, "the three values");
     fetch("http://localhost:8000/exercises",{
       method:"PUT",
       headers: {
         "Content-Type": "application/JSON"
       },
       body:JSON.stringify({
         account :{
           username: store.currentUser.currentAccount.username,
           password: store.currentUser.currentAccount.password
         },         
         exercise: [exerciseName, exerciseTime, exerciseDate]
       })
     }).then(response=>{return response.json()})
     .then(data=>{
      console.log(data)
     }).catch(error=>console.log(error))
    };
   
    useEffect(() =>{
      exer();
    })
    
  return(
    <div>
      {loggedIn == "logged in" ? (
        <div id="loggedInContainer">
          <div id="container">
            <h1>Welcome Back {store.currentUser.currentAccount.name}</h1>
            <h2>What did you accomplish today?</h2>
          </div>
          <div className="Modals" id="modal-activity" style={{"display":"none"}}>
            <h1>Accomplished<span id="exit" /></h1>
            <img id="modal-image" />
              <form>
              <label for="theActivity" >Activity:</label>
                <input type="text" id="theActivity" ></input><br />
              <label for="timeLength">Minutes:</label>
                <input type="number" id="timeLength" /><br />
              <label for="theDate">Date:</ label>  
                <input type="date" id="theDate" /><br />
              <input id="submitExercise" type="submit" value="Finished" />
              </form>
          </div>
          <Link to="/history" className="linkButton" >
            Exercise History
          </Link>
        <div id="exercise-container">
        </div>   
      </div>  
      )
      :(
        <Redirect to="/" />
      )}
        
    </div>  
  )
};
export default Welcome