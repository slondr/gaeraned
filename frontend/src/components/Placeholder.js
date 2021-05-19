import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../firebase/Auth';
import { signOut } from "../firebase/authFunctions";

const Placeholder = (props) => {
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser);

    useEffect(() => {
        const unityscripts = document.createElement('script');

        unityscripts.src = process.env.PUBLIC_URL + '/buildscripts.js';
        document.body.appendChild(unityscripts);
    }, []);

    function signOutAction() {
        signOut();
        window.location.reload();
    };

    return(
        <div>
            <button className="login" onClick={signOutAction}>Sign Out</button>
            <br/>
            <div id="unity-container" className="unity-desktop">
              <canvas id="unity-canvas"></canvas>
              <div id="unity-loading-bar">
                <div id="unity-logo"></div>
                <div id="unity-progress-bar-empty">
                  <div id="unity-progress-bar-full"></div>
                </div>
              </div>
              <div id="unity-mobile-warning">
                WebGL builds are not supported on mobile devices.
              </div>
              <div id="unity-footer">
                <div id="unity-webgl-logo"></div>
                <div id="unity-fullscreen-button"></div>
                <div id="unity-build-title">FunGame</div>
              </div>
            </div>
        </div>
    );
};

export default Placeholder;