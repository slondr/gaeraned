-module(auth_handler).
-behavior(cowboy_handler).
-export([init/2]).

init(Req, State) ->
    % TODO: Node IPC
    {ok, Req, State}.
