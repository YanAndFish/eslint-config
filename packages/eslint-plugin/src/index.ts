// rules
import iconComponentPrefix from './rules/icon-component-prefix'
import noIndexVue from './rules/no-index-vue'
import noMultipleSlashComment from './rules/no-multiple-slash-comment'
import pascalCaseComponentName from './rules/pascal-case-component-name'
import noCjsIconComponent from './rules/no-cjs-icon-component'
import noDefaultImport from './rules/no-default-import'
import jsxNoDangerWithChildren from './rules/jsx-no-danger-with-children'

// configs
import configs from './configs'

export default {
  rules: {
    'icon-component-prefix': iconComponentPrefix,
    'no-index-vue': noIndexVue,
    'no-multiple-slash-comment': noMultipleSlashComment,
    'pascal-case-component-name': pascalCaseComponentName,
    'no-cjs-icon-component': noCjsIconComponent,
    'no-default-import': noDefaultImport,
    'jsx-no-danger-with-children': jsxNoDangerWithChildren,
  },
  configs,
}
