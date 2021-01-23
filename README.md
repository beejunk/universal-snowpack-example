# Example univeral JavaScript App using Snowpack V3

This is a *To-Do* application built with [Snowpack](https://github.com/pikapkg/snowpack) and [Preact](https://preactjs.com/). A live version can be found here: 

* https://safe-everglades-56846.herokuapp.com/


The goal of this project is to provide an example application where no bundlers are used and minimal build steps are required. All source code is written exclusively in JavaScript, and component code is shared between server and client. 

## Features

* Pages are rendered server-side, and all Preact component code is shared between the server and the client.
* All code (including server code) uses ES Modules.
* [ESM-HMR](https://github.com/snowpackjs/esm-hmr) is enabled for development.
* No bundlers are used, even for production code.
* Minimal build steps required. Code is not minified for production.
* All code is pure JavaScript. Babel is not used, and Preact combined with [htm](https://github.com/developit/htm) is used to build components without JSX.

See the comments in the code for more details on the implementation.

## Caveats

The idea behind this example is to show how far you can go with as little JavaScript tooling as possible. For a real-world application, you'll want to at least minimize your code before deploying. Additionally, any large scale application should (for now) bundle its production code for performance reasons.

[Fast refresh](https://www.snowpack.dev/concepts/hot-module-replacement) is not set up for this example.

## Additional resources 

See the [Snowpack website](https://www.snowpack.dev/) for more details on the benefits of bundle-less development.
