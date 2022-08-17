// lint-staged 配置文件
module.exports = {
  'src/**/*.{js,jsx,ts,tsx,json,}': [
      "eslint --config .eslintrc.js"
  ],
  'src/**/*.{css,scss,sass}': [
      "stylelint --config .stylelintrc.js"
  ],
  "**.{html,md}": [
    "prettier --write"
  ],
};
