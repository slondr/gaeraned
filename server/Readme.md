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

## Building and running

First, install and set up Erlang. A reasonably modern version of Erlang is required.

Then, just run `make run` in the main server directory. Everything should just work! You'll be dropped in an Erlang shell, but the server and all routes will be set up automatically. You should see some debug output as the server receives connections. All regular Erlang debug and introspection functions are available in the shell, as well.

The build system is set up to produce a binary release on every build, too, so if you're so inclined you can grab the tarballs and throw it on a fancy VPS to deploy the game for real. The release binaries *should* be self-contained (meaning you don't need to install Erlang first to run them), but I haven't felt the need to verify that so YMMV.
