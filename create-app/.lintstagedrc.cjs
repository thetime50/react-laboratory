// lint-staged 配置文件
module.exports = {
  '*.{js,jsx,ts,tsx,json,}': [
      // "eslint --config .eslintrc.js"
  ],
  '*.{css,scss,sass}': [
      // "stylelint --config .stylelintrc.js"
  ],
  "**.{html,md}": [
    // "prettier --write"
  ],
};
