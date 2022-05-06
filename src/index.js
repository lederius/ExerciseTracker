import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './index.css';
import rootReducer from './Reducer/index'
import Home from "./component/Home/Home";
import AccountCreator from './component/CreateAccount/AccountCreator';
import Welcome from "./component/Welcome/Welcome";
import History from "./component/History/History";


const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Route exact path={"/"}>
          <Home/>
        </Route>
        <Route exact path={"/create-account"}>
          <AccountCreator />
        </Route>
        <Route exact path={"/welcome"}>
          <Welcome />
        </Route>
        <Route exact path={"/history"}>
          <History />
        </Route>  
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
