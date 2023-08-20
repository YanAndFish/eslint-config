// rules
import iconComponentPrefix from './rules/icon-component-prefix'
import noIndexVue from './rules/no-index-vue'
import noMultipleSlashComment from './rules/no-multiple-slash-comment'

export default {
  rules: {
    'icon-component-prefix': iconComponentPrefix,
    'no-index-vue': noIndexVue,
    'no-multiple-slash-comment': noMultipleSlashComment,
  },
  configs: {
    recommended: {
      plugins: ['@yafh'],
      rules: {
        '@yafh/icon-component-prefix': 'error',
        '@yafh/no-multiple-slash-comment': 'error',

        // vue
        '@yafh/no-index-vue': 'error',
      },
    },
  },
}
