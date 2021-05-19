-module(cache).
-export([start/0]).

start() ->
    {ok, C} = eredis:start_link(),		% Initialize the Redis server
    query(C).					% Spawn request loop

query(C) ->
    receive
	{get, From, Key} ->
	    {ok, Ret} = eredis:q(C, ["GET", Key]),
	    From!{ok, Ret},
	    query(C);
	{set, From, Key, Value} ->
	    {ok, <<"OK">>} = eredis:q(C, ["SET", Key, Value]),
	    From!{ok},
	    query(C)
    end.
