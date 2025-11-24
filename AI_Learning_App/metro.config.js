// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

const config = mergeConfig(defaultConfig, {
  // custom config nếu cần
});

module.exports = withNativeWind(config, {
  input: './global.css',  // dùng đường dẫn tương đối, không dùng path.resolve
});
