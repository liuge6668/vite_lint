module.exports = {
  extends: ['stylelint-config-standard'],
  customSyntax: 'postcss-html',
  rules: {
    'selector-class-pattern': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
  },
}
