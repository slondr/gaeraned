{application, 'server', [
	{description, "gaeraned gateway server"},
	{vsn, "0.1.0"},
	{modules, ['auth_handler','server_app','server_sup']},
	{registered, [server_sup]},
	{applications, [kernel,stdlib,cowboy]},
	{mod, {server_app, []}},
	{env, []}
]}.