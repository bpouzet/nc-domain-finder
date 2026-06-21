/** @type {import('@babel/core').ConfigFunction} */
module.exports = function(api) {
  api.cache(true) ;

  return {
    plugins: [
      [ 'react-native-paper/babel' ],
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          alias: {
            // This needs to be mirrored in tsconfig.json
            '@components': './src/components',
            '@config': './src/config',
            '@customTypes': './src/types',
            '@helpers': './src/helpers',
            '@hooks': './src/hooks',
            'react-native-device-info': './react-native-device-info.js',
          },
        },
      ],
    ],
    presets: [
      [
        'babel-preset-expo',
        {
          jsxRuntime: 'automatic',
          'react-compiler': {
            sources: filename => {
              // Match file names to include in the React Compiler.
              return filename.includes('src/app');
            },
          }
        }
      ]
    ],
  } ;
} ;
