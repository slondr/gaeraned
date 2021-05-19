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
                // REPLACE WITH ERLANG GATEWAY SERVER HTTP URL
                const { data: stats } = await axios.get('http://localhost:8543/' + currentUser.uid);
                setPlayerStats(stats);
                setLoading(false);
                console.log(stats);
            } catch (e) {
                let placeholder = {
                    token: "59843753",
                    score: 20,
                    playtime: "12:34:56",
                    jumps: 120,
                    bullets: 300
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
                <h2> Play Time: {playerStats.playtime} </h2>
                <h2> Jumps: {playerStats.jumps} </h2>
                <h2> Bullets Shot: {playerStats.bullets} </h2>
            </div>
        );
    }
}

export default Dashboard;