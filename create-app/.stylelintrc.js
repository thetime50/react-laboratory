module.exports = {
  extends: [
    'stylelint-config-standard', 
    'stylelint-config-rational-order', 
    'stylelint-config-standard-scss',
    'stylelint-config-prettier'
  ],
  plugins: [
    'stylelint-order',// 属性排序
    'stylelint-declaration-block-no-ignored-properties' // 矛盾 无效样式检查
  ],
  rules: {
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'function-name-case': 'lower',
    'no-descending-specificity': null,
    'no-invalid-double-slash-comments': null,
    'rule-empty-line-before': [ // 空行
      "always",
      {
        ignore: ['after-comment', 'first-nested', 'inside-block'],
      },
    ],
  },
  ignoreFiles: ['node_modules/**/*', 'build/**/*', 'src/assets/font/**'],
}
