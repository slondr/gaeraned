import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import axios from 'axios';

const Dashboard = (props) => {
    const { currentUser } = useContext(AuthContext);
    const [ playerStats, setPlayerStats ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    console.log(currentUser);

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("sending request");
                const { data: stats } = await axios.get('http://localhost:8080/' + currentUser.uid);
                setPlayerStats(stats);
                setLoading(false);
                console.log(stats);
            } catch (e) {
                let placeholder = {
                    token: currentUser.uid,
                    score: 50,
                    numJumps: 100,
                    numShots: 100,
                    hPlayed: 100,
                    mPlayed: 100,
                    sPlayed: 100
                }
                setPlayerStats(placeholder);
                setLoading(false);
                console.log(e);
            }
        }
        fetchData();

    }, [ currentUser ])

    if (loading) {
        return(<h2> Loading... </h2>);
    } else { 
        return(
            <div>
                <h1>Stats</h1>
                <h2> Score: {playerStats.score} </h2>
                <h2> Jumps: {playerStats.numJumps} </h2>
                <h2> Bullets Shot: {playerStats.numShots} </h2>
            </div>
        );
    }
}

export default Dashboard;