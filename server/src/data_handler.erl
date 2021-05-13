-module(data_handler).
-behavior(cowboy_handler).

-export([init/2, websocket_handle/2]).

init(Req, State) ->
    {cowboy_websocket, Req, State}.  % Upgrade connection to Websocket

websocket_handle(Frame = {text, _}, State) ->
    {text, Data} = Frame,
    io:fwrite("~s~n", [Data]), 			% Print the received message, for debug purposes
    {[{text, <<"ok">>}], State};		% Respond with "ok"
websocket_handle(_Frame, State) ->
    {ok, State}.
