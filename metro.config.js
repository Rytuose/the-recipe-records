const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.blockList = [
  /\/src-tauri\/target\//,
  /\/node_modules\/target\//
];

module.exports = config;