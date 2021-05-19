import { BrowserRouter as Redirect } from "react-router-dom";
import React, {useContext} from "react";

import { AuthContext } from '../firebase/Auth';
import firebaseApp from "../firebase/firebaseApp";

const SignUp = () => {
  const { currentUser } = useContext(AuthContext);    
  const handleSubmit = (e) => {
    e.preventDefault();    
    const { email, password } = e.target.elements;
    try {
      firebaseApp.auth().createUserWithEmailAndPassword(email.value, password.value);      
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser) {
      return <Redirect to="/" />;
  }
  return (
    <>
      <form className="login" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Email" />
        <br></br>
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUp;
