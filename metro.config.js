const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const projectRoot = __dirname;
const sdkRoot = path.resolve(projectRoot, '../react-native-bootpay-api');

const config = {
  watchFolders: [sdkRoot],
  resolver: {
    unstable_enableSymlinks: true,
    nodeModulesPaths: [path.resolve(projectRoot, 'node_modules')],
    extraNodeModules: new Proxy(
      {},
      {
        get: (_, name) => path.resolve(projectRoot, 'node_modules', name),
      },
    ),
    blockList: [
      new RegExp(
        `${sdkRoot.replace(/[/\\]/g, '[/\\\\]')}[/\\\\]node_modules[/\\\\](react|react-native|react-native-webview-bootpay|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|@react-navigation)[/\\\\].*`,
      ),
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
