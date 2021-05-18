-module(get_data_handler).
-behavior(cowboy_handler).
-export([init/2]).

init(Req, State) ->
    % TODO: Get info from Redis cache
    % TODO: Return that info
    {ok, Req, State}.
