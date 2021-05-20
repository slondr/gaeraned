-module(cache).
-export([start/0]).

start() ->
    {ok, C} = eredis:start_link(),		% Initialize the Redis server
    query(C).					% Spawn request loop

query(C) ->
    receive
	{get, From, Key} ->
	    case eredis:q(C, ["GET", Key]) of
			{ok, Ret} -> From!{ok, Ret};
			_ -> From!{ok, <<"">>}
			end,
	    query(C);
	{set, From, Key, Value} ->
	    {ok, <<"OK">>} = eredis:q(C, ["SET", Key, Value]),
	    From!{ok},
	    query(C)
    end.
