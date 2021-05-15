import React, { useContext } from 'react';
import { AuthContext } from '../firebase/Auth';
import { signOut } from "../firebase/authFunctions";

const Placeholder = (props) => {
    const { currentUser } = useContext(AuthContext)
    console.log(currentUser);

    return(
        <div>
            <p>test</p>
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
};

export default Placeholder;