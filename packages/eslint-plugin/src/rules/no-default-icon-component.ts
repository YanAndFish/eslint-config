import { createRule, isSourceOfRegExp } from '../utils'

type Options = []
type MessageIds = 'noDefaultIconCompnoent'
export const name = 'no-default-icon-component'

const singleIconComponentRE = /^@(r|v|v2|s)icons\/[^/]*\/.*$/i

export default createRule<Options, MessageIds>({
  name,
  meta: {
    type: 'problem',
    docs: {
      description: '',
      recommended: 'recommended',
    },
    fixable: 'code',
    schema: [],
    messages: {
      noDefaultIconCompnoent: 'Do not import icon components by default.',
    },
  },
  defaultOptions: [],
  create: (context) => {
    return {
      ImportDeclaration(node) {
        if (!isSourceOfRegExp(node, singleIconComponentRE))
          return

        context.report({
          messageId: 'noDefaultIconCompnoent',
          node,
          fix(fixer) {
            return null
          },
        })
      },
    }
  },
})
