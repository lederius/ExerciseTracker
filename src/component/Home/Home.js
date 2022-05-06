import $ from "jquery";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import{ Redirect } from "react-router-dom";
import "../../bootstrap.min.css";
 // why do i need the router and route to make link work ??

function Home (){
  const dispatch = useDispatch();
  let store = useSelector(state => state);
  let loggedIn = useSelector(state => state.loggedIn.status);
  const CURRENTUSER = "CURRENTUSER";
  
  const loggedInToAccount = (currentAccount) => {
    return {
      type: CURRENTUSER,
      currentAccount
    };
  };

  const ONLINE ="ONLINE";
  const  onlineStatus = (status) =>{
    return{
      type:ONLINE,
      status
    };
  }
  const HISTORY = "HISTORY"
  // const addExercises = (exercises) => {
  //   return {
  //     type: HISTORY,
  //     exercises
  //   };
  // };
  function LogIn(e){
e.preventDefault()
      let name = $("#userName").val()
      let password = $("#password").val()
      fetch("http://localhost:8000/",{
        method:"POST",
        body: JSON.stringify({
          User: name,
          comment: "user attempting to log on"
        }),
        headers:{
          loginuser: name,
          password: password
        }
      }).then(response=>{return response.json()})
      .then(data=>{
        console.log(data)
        if(data.status === "logged in"){
          console.log("boom in there")
          console.log(data)
          dispatch(loggedInToAccount(data.account))
           dispatch(onlineStatus(data.status))
          // dispatch(addExercises(data.account.activity))
          
        }
        else{ console.log("whoops try again")}
      })
      .catch(error=>console.log(error))
      console.log(loggedIn, "??????")
  }
  return(
    <div>
      {loggedIn == "logged in" ? (
        <Redirect to="/welcome" />
      )
      :(
        <div id="offline">
          <h1>Exercise Tracker</h1>
          <div id="contianerLogIn">
            <form>
              <label for="userName">User Name</label>
                <input type="text" id="userName" placeholder="User Name" required></input><br />
              <label for="password">Password</label>
                <input type="password" id="password" placeholder="Password" required></input><br />
              <input type="submit" value="Log In" onClick={LogIn}></input>
            </form>
          </div>
          <Link to="/create-account" className="linkButton" >
            Create Account
          </Link>
        </div>
      )}      
    </div>
  )
};
export default Home