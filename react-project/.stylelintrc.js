module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-config-standard-scss'],
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'function-name-case': 'lower',
    'no-descending-specificity': null,
    'no-invalid-double-slash-comments': null,
    'rule-empty-line-before': [ // 空行
      'error',
      {
        ignore: ['after-comment', 'first-nested', 'inside-block'],
      },
    ],
  },
  ignoreFiles: ['node_modules/**/*', 'build/**/*', 'src/assets/font/**'],
}
