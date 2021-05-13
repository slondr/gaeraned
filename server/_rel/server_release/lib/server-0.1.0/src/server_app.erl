-module(server_app).
-behaviour(application).

-export([start/2]).
-export([stop/1]).

start(_Type, _Args) ->
    Dispatch = cowboy_router:compile([{'_', [{"/", auth_handler, []}]}]),
    {ok, _} = cowboy:start_clear(auth_handler, [{port, 8080}], #{env => #{dispatch => Dispatch}}),
    server_sup:start_link().

stop(_State) ->
    ok.
