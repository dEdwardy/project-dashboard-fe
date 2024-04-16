import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
  },
  {
    rules: {
      'no-async-promise-executor': 1,
      'no-console': 1,
      'node/no-unpublished-import': 1,
      'unused-imports/no-unused-vars': 1,
    },
  },
)
