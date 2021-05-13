-module(auth_handler).
-behavior(cowboy_handler).

-export([init/2, websocket_handle/2]).

init(Req, State) ->
    % TODO: Node IPC
    {cowboy_websocket, Req, State}.

websocket_handle(Frame = {text, _}, State) ->
    io:fwrite("~p~n", [Frame]),
    {[{text, <<"ok">>}], State};
websocket_handle(_Frame, State) ->
    {ok, State}.
