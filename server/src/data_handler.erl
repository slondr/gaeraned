-module(data_handler).
-behavior(cowboy_handler).

-export([init/2, websocket_handle/2, websocket_info/2]).

init(Req, State) ->
    {cowboy_websocket, Req, State}.  % Upgrade connection to Websocket

websocket_handle(Frame = {text, _}, State) ->
    {text, Data} = Frame,
    io:fwrite("~s~n", [Data]), 			% Print the received message, for debug purposes
    StatMap = json:from_binary(Data),
    {ok, Token} = maps:find(<<"token">>, StatMap),
    io:fwrite("token: ~w~n", [Token]),
    whereis(cache)!{set, self(), Token, json:to_binary(StatMap)},
    {[{text, <<"ok">>}], State};		% Respond with "ok"
websocket_handle(_Frame, State) ->
    {ok, State}.

%% Function to handle incoming Erlang messages
websocket_info({log, Text}, State) ->
    io:fwrite("~w~n", [Text]),
    {ok, State};
websocket_info(Info, State) ->
    io:fwrite("~w~n", [Info]),
    {ok, State}.
