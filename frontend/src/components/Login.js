import React, { useState, useContext, useEffect } from 'react';
import { signIn } from "../firebase/authFunctions";
import { AuthContext } from "../firebase/Auth";

const Login = (props) => {
    const { currentUser } = useContext(AuthContext);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    useEffect(() => {
        if (currentUser) {
            props.history.push('/');
        }
    }, [currentUser, props.history]);

    async function signInAction(e) {
        e.preventDefault();
        signIn(email, password);
    };

    function signUpPage() {
        props.history.push('/signup');
    };

    return(
        <div>
        <form className="login">
            <h2>Log In</h2>
            <label> Email </label>
                <input type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <br />
            <label> Password </label>
                <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <br />
            <button type="submit" value="submit" onClick={e => signInAction(e)}>Log In</button>
            <br />
            <button type="button" onClick={signUpPage}>Sign Up</button>
        </form>
        </div>);
};

export default Login;