I've duplicated the code relevant to the websocket server (WSData.cs) for visibility, and left it in this directory. Uploading the full project file was too big. 
Changes made here will not apply to the game. If you need to change something, let me know and I can take care of it. 

To run the build, you must put the files on the server. Unity + WebGL requires a server to run, you cannot just run the local files. 
You should also run the websockets server (located in the WSServer folder). 

WebSockets is set up on port 8080, let me know if this needs to change

Game sends raw string to the port in the following format: 
'{"score": 27, "numJumps": 39, "numShots": 0, "minutes": 0, "seconds": 54}'
where every data type is int, and is cumulative across a whole session.
numShots is currently always 0 because there is a bug in the game code (going to fix that on Tuesday)

to play, use arrow keys to move and space to jump
jump on the mice/bees in order to kill them
you have 10 health (displayed in top left, 2nd row)
current score is top left, 1st row.

once you die you can retry with the button.
the game is "infinite" with 2 levels (more soon if time permits)



TODO: 
pull data from server on game start in order to get user info/auth & stats 
fix bullet bug
label health better

animations??? we'll see



NOTE: WebSockets server and code template from: https://github.com/endel/NativeWebSocket