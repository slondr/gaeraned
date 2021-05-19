import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import { signOut } from "../firebase/authFunctions";
import axios from 'axios';

const Game = (props) => {
    const { currentUser } = useContext(AuthContext);
    const [ playerStats, setPlayerStats ] = useState({
                    token: currentUser.uid,
                    score: 30,
                    numJumps: 0,
                    numShots: 0,
                    hPlayed: 0,
                    mPlayed: 0,
                    sPlayed: 0
                });

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("sending request");
                const { data: stats } = await axios.get('http://localhost:8080/' + currentUser.uid);
                setPlayerStats(stats);
                console.log(stats);
            } catch (e) {
                console.log("failed but changing for test purposes");
                setPlayerStats({
                    token: currentUser.uid,
                    score: 500,
                    numJumps: 0,
                    numShots: 0,
                    hPlayed: 0,
                    mPlayed: 0,
                    sPlayed: 0
                  }
                )
                console.log(e);
            }
        }
        fetchData();

        const unityscripts = document.createElement('script');
        unityscripts.src = process.env.PUBLIC_URL + '/buildscripts.js';
        document.body.appendChild(unityscripts);
    }, [ currentUser ]);

    useEffect(() => {
      window.gameData = JSON.stringify(playerStats);
      console.log(window.gameData);
    }, [ playerStats ]);

    async function refetchData() {
      try {
        const { data: stats } = await axios.get('http://localhost:8080/' + currentUser.uid);
        setPlayerStats(stats);
        console.log("refetching data");
      } catch (e) {
        console.log(e);
      }
    };

    setInterval(refetchData, 10000);

    function signOutAction() {
        signOut();
        window.location.reload();
    };

    return(
        <div>
            <script></script>
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

export default Game;