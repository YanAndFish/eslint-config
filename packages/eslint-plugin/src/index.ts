// rules
import iconComponentPrefix from './rules/icon-component-prefix'

export default {
  rules: {
    'icon-component-prefix': iconComponentPrefix,
  },
  configs: {
    recommended: {
      plugins: ['@yafh'],
      rules: {
        '@yafh/icon-component-prefix': 'error',
      },
    },
  },
}
