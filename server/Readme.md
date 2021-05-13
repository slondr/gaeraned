# gaeraned Gateway Server

This server acts as the gateway for the multi-part gaeraned backend. It is written in Erlang, and capable of handling tens of thousands of concurrent connections while maintaining reasonable throughput and low latency.

Great care was taken in ensuring that the server supports these massive amounts of simultaneous players. As a result, the server is heavily multithreaded --- a new thread is spawned for each connection, and the requests and responses are all handled seperately and concurrently. Also, it takes advantage of the async aspects of Redis by not blocking when setting data to the cache. As the highest volume responses the server will receive are game state updates by clients, this results in a high degree of throughput as nothing blocks.

In preliminary testing, the server was capable of handling about sixty thousand simultaneous users without crashing or serious slowdowns. Hypothetically, because this is based on OTP, the server could be transparently deployed to multiple distributed compute notes or even entire server clusters, which would raise that number potentially limitlessly. Sadly, our team doesn't have the money (or desire) to set that up right now!

## Routes

There are two routes useful for the gaeraned front-end:

### /

This is an HTTP route. 

The server accepts some basic authenticating information, and passes that information to the Node server for verification through Firebase. When it receives information about the user back from Node, it returns that to the requesting client.

### /data

This is a WebSocket route.

The server accepts a string containing JSON data representing the current state of the client's game state: 

| datum        | type     |
|--------------|----------|
| score        | int      |
| playtime     | HH:MM:SS |
| jumps        | int      |
| bullets shot | int      |

The server stores this data in the Redis cache.
