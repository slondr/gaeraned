-module(auth_handler).
-behavior(cowboy_handler).

-export([init/2]).

init(Req, State) ->
    Req = cowboy_req:reply(200,
			  #{<<"content-type">> => <<"text/plain; charset=utf-8">>},
			   <<"Authentication">>,
			   Req),
    {ok, Req, State}.
