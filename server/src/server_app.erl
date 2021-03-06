-module(server_app).
-behaviour(application).

-export([start/2]).
-export([stop/1]).

start(_Type, _Args) ->
    register(cache, spawn(cache, start, [])),
    Dispatch = cowboy_router:compile([{'_', [{"/", data_handler, []},
					     {"/:token", get_data_handler, []}]}]),
    {ok, _} = cowboy:start_clear(auth_handler, [{port, 8080}], #{env => #{dispatch => Dispatch}}),
    server_sup:start_link().

stop(_State) ->
    ok.
