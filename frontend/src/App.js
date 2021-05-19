import './App.css';
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from './firebase/Auth';
// import Signup from "./Pages/Login/Signup";
import Login from "./components/Login";
import Signup from "./components/Signup"
import Private from "./components/Private";
import Placeholder from "./components/Placeholder";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <h1>gaeraned studios</h1>
        <Switch>
          <Private exact path="/" component={Placeholder} />
          <Route exact path="/login" component={Login} /> 
          <Route exact path="/signup" component={Signup} /> 
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
