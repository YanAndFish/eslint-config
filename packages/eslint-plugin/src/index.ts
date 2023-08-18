// rules
import iconComponentPrefix from './rules/icon-component-prefix'
import noIndexVue from './rules/no-index-vue'

export default {
  rules: {
    'icon-component-prefix': iconComponentPrefix,
    'no-index-vue': noIndexVue,
  },
  configs: {
    recommended: {
      plugins: ['@yafh'],
      rules: {
        '@yafh/icon-component-prefix': 'error',

        // vue
        '@yafh/no-index-vue': 'error',
      },
    },
  },
}
