-module(get_data_handler).
-behavior(cowboy_handler).
-export([init/2]).

init(Req, State) ->
    Token = cowboy_req:binding(token, Req),	% Parse the requested token
    io:fwrite("~s~n", [Token]),			% for debug purposes
    whereis(cache)!{get, self(), binary_to_list(Token)}, % Get the stat info from the cache
    receive {ok, Stats} ->
        Req1 = cowboy_req:set_resp_header(<<"access-control-allow-methods">>, <<"GET">>, Req),
        Req2 = cowboy_req:set_resp_header(<<"access-control-allow-origin">>, <<"*">>, Req1),
	    Req3 = cowboy_req:reply(200, #{<<"content-type">> => <<"application/json">>}, Stats, Req2) % Return the info
    end,
    {ok, Req3, State}.
