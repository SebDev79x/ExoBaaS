// Learn more https://docs.expo.io/guides/customizing-metro

// GROSSE ERREUR AU DEMARRAGE : IDB TRUC ... : https://github.com/facebook/metro/issues/535
const { getDefaultConfig } = require('@expo/metro-config');
const defaultConfig = getDefaultConfig(__dirname);

module.exports = (async () => {
  defaultConfig.resolver.sourceExts.push('cjs');
  return defaultConfig;
})();