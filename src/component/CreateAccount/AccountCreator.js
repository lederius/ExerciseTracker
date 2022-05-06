import React from "react";
import $ from "jquery";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function AccountCreator(){
  function LogIn(e){
    e.preventDefault()
    let name = $("#userName").val()
    let password = $("#password").val()
    let verify = $("#verify").val()
    // $("#createdAccount").hide()
    if(password !== verify){
      alert("Passwords Do Not Match")
    // $("#createdAccount").show().text("Passwords Do Not Match")
    // $("#createdAccount")
    }
    else if(password.length == 0 || verify.length == 0){
      // $("#createdAccount").show()
      // $("#createdAccount").text("Password is too short")
      alert("Password is too short")
    }
    else if(name.length == 0){
      // $("#createdAccount").show()
      // $("#createdAccount").text("Password is too short")
      alert("Name Left Blank")
    }
    else{
      fetch("http://localhost:8000/create-account",{
        method:"POST",
          body: {
            newuser:name
          },
          headers:{
            username: name,
            password: password
          }
      }).then(response=>{return response.json()})
        .then(data=>console.log(data))
        .catch(error=>console.log(error))
        $("#createdAccount").show().text("New Account Created")
      }
  }
  return(
    <div>
      <h1>New Account</h1>
      <div id="contianerLogIn">
        <form>
          <label for="userName">User Name</label>
            <input type="text" id="userName" placeholder="User Name" required></input><br />
          <label for="password">Password</label>
            <input type="password" id="password" placeholder="Password" required></input><br />
          <label for="verify">Verfiy Password</label>  
            <input type="verify" id="verify" placeholder="Verify Password" required></input><br />
          <input type="submit" value="Create Account" onClick={LogIn}></input>
        </form>
      </div>
      <h1 id="createdAccount" style= {{"display":"none"}}></h1>
      <Link to="/" className="linkButton" >
        Home
      </Link>
    </div>
  )
};
export default AccountCreator