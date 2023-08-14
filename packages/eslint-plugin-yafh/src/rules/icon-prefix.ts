import { type Matcher, createRule, isSourceOf } from '../utils'

type Options = [Matcher, string]
type MessageIds = 'missingIconPrefix'

export default createRule<Options, MessageIds>({
  name: 'import-prefix',
  meta: {
    type: 'problem',
    docs: {
      description: '',
      recommended: 'recommended',
    },
    fixable: 'code',
    schema: [
      {
        type: ['string', 'array', 'object'],
        description: 'Import source matcher',
      },
      {
        type: ['string'],
        description: 'prefix',
      },
    ],
    messages: {
      missingIconPrefix: 'Expect import prefix \'{{prefix}}\'',
    },
  },
  defaultOptions: ['@vicons', 'Icon'],
  create: (context, options) => {
    return {
      ImportDeclaration(node) {
        if (!isSourceOf(node, options[0]))
          return
        context.report({
          node,
          messageId: 'missingIconPrefix',
          data: {
            prefix: options[1],
          },
        })
      },
    }
  },
})
