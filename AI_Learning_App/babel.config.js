// babel.config.js
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      // Preset mặc định của React Native
      ['module:@react-native/babel-preset', { jsxImportSource: 'nativewind' }],
      // NativeWind dùng như 1 *preset* (KHÔNG phải plugin)
      'nativewind/babel',
    ],
    plugins: [
      // Các plugin khác để ở đây
      'react-native-reanimated/plugin', // nên để plugin này cuối cùng
    ],
  };
};
