-module(auth_handler).
-behavior(cowboy_handler).

-export([init/2]).

init(Req, State) ->
    % TODO: Node IPC
    {cowboy_websocket, Req, State}.
