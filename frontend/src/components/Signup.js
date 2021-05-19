import React, { useContext, useEffect } from "react";
import { AuthContext } from '../firebase/Auth';
import firebaseApp from "../firebase/firebaseApp";

const SignUp = (props) => {
  const { currentUser } = useContext(AuthContext); 

  useEffect(() => {
        if (currentUser) {
            props.history.push('/');
        }
    }, [currentUser, props.history]);

  async function handleSubmit(e) {
    e.preventDefault();    
    const { email, password } = e.target.elements;
    await firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .catch((e) => alert(e));
  };

  return (
    <>
      <form className="login" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Email" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <br />
        <button type="submit">Sign Up</button>
        <br />
        <button type="button" onClick={() => props.history.push('/login')}>Log In</button>
      </form>
    </>
  );
};

export default SignUp;
