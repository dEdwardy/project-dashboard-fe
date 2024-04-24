import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    ignores: ['test/**/*', '*.util.**'],
  },
  {
    rules: {
      'no-console': 1,
      'no-async-promise-executor': 1,
      'unused-imports/no-unused-vars': 1,
      'eqeqeq': 1,
      'no-prototype-builtins': 1,
      'ts/no-use-before-define': 1,
      'style/max-statements-per-line': 1,
    },
  },
)
