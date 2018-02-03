package main

type Routes []Route

var routes = Routes{
	Route{
		"Index",
		"GET",
		"/",
		Index,
	},
	Route{
		"Signup",
		"POST",
		"/signup",
		Signup,
	},
	Route{
		"Login",
		"POST",
		"/login",
		Login,
	},
	Route{
		"GetUsers",
		"GET",
		"/users",
		GetUsers,
	},
	Route{
		"GetUser",
		"GET",
		"/user/{userid}",
		GetUser,
	},
	Route{
		"NewPost",
		"POST",
		"/post",
		NewPost,
	},
	Route{
		"GetPosts",
		"GET",
		"/posts",
		GetPosts,
	},
	Route{
		"GetPost",
		"GET",
		"/post/{postid}",
		GetPost,
	},
}
