import { createRule } from '../utils'

type Options = []
type MessageIds = 'noMultipleSlashComment'
export const name = 'no-multiple-slash-comment'

export default createRule<Options, MessageIds>({
  name,
  meta: {
    type: 'suggestion',
    docs: {
      description: '',
      recommended: 'recommended',
    },
    fixable: 'code',
    schema: [],
    messages: {
      noMultipleSlashComment: 'Do not use multiple slashes for single line comments.',
    },
  },
  defaultOptions: [],
  create: (context) => {
    const sourceCode = context.getSourceCode()
    return {
      Program() {
        sourceCode.getAllComments()
          .filter(comment => comment.type === 'Line')
          .filter(comment => /^\/+/.test(comment.value))
          .forEach((comment) => {
            context.report({
              node: comment,
              messageId: 'noMultipleSlashComment',
              fix: fixer => fixer.replaceText(comment, `//${comment.value.replace(/^\/+/, '')}`),
            })
          })
      },
    }
  },
})
