
// lint-staged 配置文件
module.exports = {
    "*.{ts,tsx,js}": [
      "eslint --config .eslintrc.js"
    ],
    "*.{css,less,scss}": [
      "stylelint --config .stylelintrc.js"
    ],
    // "*.{ts,tsx,js,json,html,yml,css,less,scss,md}": [
    //   "prettier --write"
    // ]
}