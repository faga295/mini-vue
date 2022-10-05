module.exports = {
  root: true,
  extends: ['@sxzz/eslint-config'],
  rules: {
    'import/no-mutable-exports': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    'sort-imports': 'off',
    'unicorn/explicit-length-check': 'off',
    'unicorn/no-for-loop': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
};
