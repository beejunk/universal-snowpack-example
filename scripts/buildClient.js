import snowpack from "snowpack";
import snowpackConfig from "../snowpack.config.js";

const { build, createConfiguration } = snowpack;

/**
 * Build client code. This will output all client assets to the `build`
 * directory.
 *
 * All server code in this example uses ES Modules (including the Snowpack
 * config file). As a result, we need to run the build programatically using
 * the JavaScript API since the Snowpack CLI assumes CommonJS modules are
 * being used.
 */
async function buildClient() {
  const config = createConfiguration(snowpackConfig);
  const result = await build({ config });

  // TODO: There appears to be a bug where the Snowpack API is not honoring the
  // `watch` settings of the config and is instead always watching after build.
  // So we need to manually shut down the watcher.
  result.shutdown();

  process.exit();
}

buildClient();
