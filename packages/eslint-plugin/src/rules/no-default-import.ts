import { createRule, isStrictSourceOf } from '../utils'

type Options = [string | string[]]
type MessageIds = 'noDefaultImport' | 'noWrokspaceImport'
export const name = 'no-default-import'

export default createRule<Options, MessageIds>({
  name,
  meta: {
    type: 'problem',
    docs: {
      description: '',
      recommended: 'recommended',
    },
    schema: [
      {
        type: ['array', 'string'],
        description: 'No default import source matcher',
      },
    ],
    messages: {
      noDefaultImport: 'Do not use default imports in \'{{source}}\'',
      noWrokspaceImport: 'Do not use workspace imports in \'{{source}}\'',
    },
  },
  defaultOptions: [[]],
  create: (context, options) => {
    return {
      ImportDeclaration(node) {
        const [matcher] = options
        if (!isStrictSourceOf(node, matcher))
          return

        // skip type import
        if (node.importKind === 'type')
          return

        let messageId: MessageIds | undefined
        for (const specifier of node.specifiers) {
          if (specifier.type === 'ImportDefaultSpecifier') {
            messageId = 'noDefaultImport'
            break
          } else if (specifier.type === 'ImportNamespaceSpecifier') {
            messageId = 'noWrokspaceImport'
            break
          }
        }

        if (messageId) {
          context.report({
            node,
            messageId,
            data: {
              source: node.source.value,
            },
          })
        }
      },
    }
  },
})
