import React, { useState, useContext } from 'react';
import { BrowserRouter as Redirect } from "react-router-dom";
import { signIn } from "../firebase/authFunctions";
import { AuthContext } from "../firebase/Auth";

const Login = (props) => {
    const { currentUser } = useContext(AuthContext);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    if (currentUser) {return <Redirect to="/" />}
        else {
            return(
                <div>
                <form>
                    <label>
                        Email: 
                        <input name="email" onChange={e => setEmail(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Password: 
                        <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <br />
                    <button type="button" value="Submit" onClick={() => signIn(email, password)}>Submit</button>
                </form>
                </div>
            );
        }
};

export default Login;