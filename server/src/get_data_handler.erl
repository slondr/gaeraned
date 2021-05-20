-module(get_data_handler).
-behavior(cowboy_handler).
-export([init/2]).

init(Req, State) ->
    Token = cowboy_req:binding(token, Req),	% Parse the requested token
    io:fwrite("~s~n", [Token]),			% for debug purposes
    whereis(cache)!{get, self(), binary_to_list(Token)}, % Get the stat info from the cache
    receive {ok, Stats} ->
	    Req = cowboy_req:reply(200, #{<<"content-type">> => <<"application/json">> , <<"access-control-allow-origin">> => <<"*">>, <<"access-control-allow-methods">> => <<"GET">>}, Stats, Req) % Return the info
    end,
    {ok, Req, State}.
