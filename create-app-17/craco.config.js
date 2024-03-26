// const eslintPlugin = {
//   overrideCracoConfig: ({
//     cracoConfig,
//     pluginOptions,
//     context: { env, paths },
//   }) => {
//     const eslintConfig = require("./.eslintrc.js");
//     cracoConfig.eslintConfig = eslintConfig;
//     return cracoConfig;
//   },
// };
module.exports = {
  plugins: [
    {
      plugin: require("craco-plugin-scoped-css"),
    },
    // {
    //   plugin: eslintPlugin,
    //   options: { preText: "Will log the craco config:" },
    // },
  ],
  // eslint: {
  //   enable: true,
  //   // configure: (eslintConfig, { env, paths }) => {
  //   //   console.log('eslintConfig', eslintConfig)
  //   //   return eslintConfig;
  //   // },
  // },
};
