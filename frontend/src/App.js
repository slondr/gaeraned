import './App.css';
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from './firebase/Auth';
// import Signup from "./Pages/Login/Signup";
import Login from "./components/Login";
import Signup from "./components/Signup"
import Private from "./components/Private";
import Game from "./components/Game";
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <h1>gaeraned studios</h1>
        <p>How to play: WASD to move, left to shoot, and space to jump. Once you have killed enough enimes and collected enough coins you must find the key and exit through the door!</p>
        <Switch>
          <Private exact path="/" component={Game} />
          <Private exact path="/dashboard" component={Dashboard} />
          <Route exact path="/login" component={Login} /> 
          <Route exact path="/signup" component={Signup} /> 
          <Route> <h1>404 Not Found</h1> </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
