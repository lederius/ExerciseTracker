import $ from "jquery";
import React from "react";
import { useEffect } from "react"
import{ Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function History(){
  const dispatch = useDispatch();
  let store = useSelector(state => state);
  let loggedIn = useSelector(state => state.loggedIn.status)
  const HISTORY = "HISTORY"
  // const addExercises = (exercises) => {
  //   return {
  //     type: HISTORY,
  //     exercises
  //   };
  // };






  const displayExercises = ()=>{
    // console.log(store.exercises, "should not be null")
    // console.log(store.currentUser.currentAccount["_id"], "should be a number")
    let idNumber = store.currentUser.currentAccount["_id"]
    // console.log(idNumber)
    fetch("http://localhost:8000/history",{
      method: "POST",
      body: JSON.stringify({
        status: "retreiving user exercise history",
        userId: idNumber
      }),
      headers: {
        "Content-type": "application/json",
      }
    }).then(response=>{return response.json()})
    .then(data=>{


      data.activity.map((x)=>{
        console.log(data.activity, "the data.activ")
        $(`<li id=${x["_id"]}>${x["exercise"]} for ${x["time"]} minutes on ${x["date"]}</li>`).appendTo("#history")
        $(`#${x["_id"]}`).click(function(){
          console.log("click function on list is working");
          $("#modalUpdate").hide();
          $("form").attr("id", `${x["_id"]}`)
          let example = $(this).attr("id")
          console.log(example, "this is the form className!!!")
          $("#newActivity").val(`${x["exercise"]}`)
          $("newTimeLength").val(`${x["time"]}`)
          $("#newDate").val(`${x["date"]}`)
          $("#modalUpdate").show();
        })
      })
     })
    $("#updateExercise").click(updateActivities)
    $("#deleteExercise").click(deleteActivities)

  }
  


  const deleteActivities = (e) =>{
    $("form").hide()
    e.preventDefault()
    let idNumber = store.currentUser.currentAccount["_id"]
    let activityId = $("form").attr("id"); 
    console.log(idNumber, "idNumber", activityId, "activityId","should be 2 values")
    fetch("http://localhost:8000/delete",{
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        status: "retreiving user exercise history",
        userId: idNumber,
        activityId: activityId,       
      }),
      headers: {
        "Content-type": "application/json",
      }
    })
    .then(response=>{return response.json()})
    .then(data=>{
      console.log(data, "the response data from delete")
      let exercises = Object.values([data["activity"]["activity"]])
      console.log(exercises, "exercises from delete")

      $("#history").empty()

      exercises.map((x)=>{
        for(let y in x){
          console.log(y, "y in the for in")
          console.log(x[y],"inside the map function")
          console.log(x[y]["_id"],"x[y][0]")
          $(`<li id=${x[y]["_id"]}>${x[y]["exercise"]} for ${x[y]["time"]} minutes on ${x[y]["date"]}</li>`).appendTo("#history")
          $("#modalUpdate").hide()
        $(`#${x[y]["_id"]}`).click(function(){
          $("#modalUpdate").hide();
          $("form").removeAttr("id");
          $("form").attr("id", `${x[y]["_id"]}`)
          $("#newActivity").val(`${x[y]["exercise"]}`)
          $("newTimeLength").val(`${x[y]["time"]}`)
          $("#newDate").val(`${x[y]["date"]}`)
          $("#modalUpdate").show();
        })
          console.log("the bottom")
        }
      })
    })
    $("#updateExercise").click(updateActivities)
    $("#deleteExercise").click(deleteActivities)

  }








  const updateActivities = (e) =>{
    e.preventDefault()
    let idNumber = store.currentUser.currentAccount["_id"]
    let activityId = $("form").attr("id"); 
    let activityName = $("#newActivity").val();
    let activityTimeLength = $("#newTimeLength").val();
    let activityDate = $("#newDate").val()
    console.log(idNumber, "idNumber", activityId, "activityId", activityName, "activityName", activityTimeLength,"activityTimeLength", activityDate,"activityDate" , "should be 5 values")
    fetch("http://localhost:8000/update",{
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        status: "retreiving user exercise history",
        userId: idNumber,
        activityId: activityId,
        name: activityName,
        time: activityTimeLength,
        date: activityDate        
      }),
      headers: {
        "Content-type": "application/json",
      }
    })
    .then(response=>{return response.json()})
    .then(data=>{
      console.log(data, "the response data")
      let exercises = Object.values([data["activity"]["activity"]])
      console.log(exercises, "[data[1][3]])")




      $("#history").empty()

      exercises.map((x)=>{
        for(let y in x){
          console.log(y, "y in the for in")
          console.log(x[y],"inside the map function")
          console.log(x[y]["_id"],"x[y][0]")
          $(`<li id=${x[y]["_id"]}>${x[y]["exercise"]} for ${x[y]["time"]} minutes on ${x[y]["date"]}</li>`).appendTo("#history")
          $("#modalUpdate").hide()
        $(`#${x[y]["_id"]}`).click(function(){
          $("#modalUpdate").hide();
          $("form").removeAttr("id");
          $("form").attr("id", `${x[y]["_id"]}`)
          $("#newActivity").val(`${x[y]["exercise"]}`)
          $("newTimeLength").val(`${x[y]["time"]}`)
          $("#newDate").val(`${x[y]["date"]}`)
          $("#modalUpdate").show();
        })
          console.log("the bottom")
        }
      })
    })
    $("#updateExercise").click(updateActivities)
    $("#deleteExercise").click(deleteActivities)

  }




  useEffect(()=>{
    displayExercises()
  })
  return(
      
    <div>


       {loggedIn === "logged in" ? (
         
        <div id="historyContainer">
          {console.log(store)}
         <h1>Activity</h1>  
          <ol id="history">

          </ol>
          <div className="activityUpdate" id="modalUpdate" style={{"display":"none"}}>
            <form >
              <label for="newActivity" >Activity:</label>
                <input type="text" id="newActivity" ></input><br />
              <label for="newTimeLength">Minutes:</label>
                <input type="number" id="newTimeLength" /><br />
              <label for="newDate">Date:</ label>  
                <input type="date" id="newDate" /><br />
              <input id="updateExercise" type="submit" value="Update" />
              <input id="deleteExercise" type="submit" value="Delete" />
            </form>
          </div>  
        </div>
       )
       :(
        <Redirect to="/" />  
       )}    
    </div>
  );
};
export default History