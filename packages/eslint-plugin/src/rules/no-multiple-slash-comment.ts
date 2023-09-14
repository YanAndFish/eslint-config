import { AST_TOKEN_TYPES, type TSESTree } from '@typescript-eslint/utils'
import { createRule } from '../utils/common'

type Options = []
type MessageIds = 'noMultipleSlashComment'
export const name = 'no-multiple-slash-comment'

function isTripleSlashDirectives(comment: TSESTree.Comment): boolean {
  if (comment.type !== AST_TOKEN_TYPES.Line)
    return false

  return /^\/\s*<(amd-module|amd-dependency|reference){1}.*\/>\s*$/.test(comment.value)
}

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
          .filter(comment => !isTripleSlashDirectives(comment))
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
