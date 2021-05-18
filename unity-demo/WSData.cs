using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using NativeWebSocket;

public class ScoreController : MonoBehaviour
{
    WebSocket websocket;
    public int score = 0;
    public int localScore = 0;  //local
    public int numJumps = 0;
    public int numShots = 0;
    public float tTime;     //local
    public float mPlayed;
    public float sPlayed; 

    //Start is called at the beginning of the game- 
    //here we should pull the data existing in the DB and update these local variables
    async void Start()
    {
        websocket = new WebSocket("ws://localhost:8080");

        websocket.OnOpen += () => {
            Debug.Log("Connection Open");
        };
        websocket.OnError += (e) =>
        {
            Debug.Log("Error! " + e);
        };

        websocket.OnClose += (e) =>
        {
            Debug.Log("Connection closed!");
        };

        websocket.OnMessage += (data) =>
        {
            Debug.Log("OnMessage!");
            Debug.Log(data);
        };

        // waiting for messages
        await websocket.Connect();
    }

    private async void OnApplicationQuit() {
        await websocket.Close();
    }


    //pushStats is called at the end of every level
    async public void pushStats(){
        string data = "{\"score\": " + score.ToString() + ", \"numJumps\": " + numJumps.ToString() + ", \"numShots\": " + numShots.ToString() 
            + ", \"minutes\": " + mPlayed.ToString() + ", \"seconds\": " + sPlayed.ToString() + "}";
        Debug.Log("PUSHING: " + data);
        
        await websocket.SendText(data);
    }

}
