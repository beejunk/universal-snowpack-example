# Example univeral JavaScript App using Pike Web

This is an example *To-Do* application that uses no build steps whatsoever. No Webpack, no Babel, not even minification. The purpose of this example is to show that you can, if you like, build a full application with server-side rendering and shared client/server code with vanilla JavaScript and nothing else. 

You can see a live example running here:

* https://safe-everglades-56846.herokuapp.com/

## @pika/web

This application makes use of a handy tool called [@pika/web](https://github.com/pikapkg/web) which will take all your ES-module-compatable dependencies and install them in a designated folder that can then be used to serve up all required JavaScript assets.

## Additional resources

If you're curious as to why anyone would want to do this, this excellent blog post is a good place to start:

* https://dev.to/pika/a-future-without-webpack-ago