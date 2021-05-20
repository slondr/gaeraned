import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import axios from 'axios';

const Dashboard = (props) => {
    const { currentUser } = useContext(AuthContext);
    const [ playerStats, setPlayerStats ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
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
                setError(true);
                setLoading(false);
                console.log(e);
            }
        }
        fetchData();

    }, [ currentUser ])

    if (loading) {
        return(<h2> Loading... </h2>);
    } else if (error) { 
        return(<h2> Sorry, an error occured. </h2>);
    } else {
        return(
            <div>
                <h1>Stats</h1>
                <h2> Score: {playerStats.score} </h2>
                <h2> Jumps: {playerStats.numJumps} </h2>
                <h2> Bullets Shot: {playerStats.numShots} </h2>
                <h2> Playtime: {playerStats.hPlayed}:{playerStats.mPlayed}:{playerStats.sPlayed} </h2>
            </div>
        );
    }
}

export default Dashboard;