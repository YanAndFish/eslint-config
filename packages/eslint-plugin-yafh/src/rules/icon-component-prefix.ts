import { AST_NODE_TYPES } from '@typescript-eslint/types'
import { type Matcher, createRule, isAliasImportSpecifier, isSourceOf } from '../utils'

type Options = [Matcher, string]
type MessageIds = 'missingIconComponentPrefix'

export default createRule<Options, MessageIds>({
  name: 'icon-component-prefix',
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
        description: 'Icon Component source matcher',
      },
      {
        type: ['string'],
        description: 'prefix',
      },
    ],
    messages: {
      missingIconComponentPrefix: 'Expect icon component prefix \'{{prefix}}\'',
    },
  },
  defaultOptions: ['@vicons', 'Icon'],
  create: (context, options) => {
    return {
      ImportDeclaration(node) {
        const [matcher, prefix] = options
        if (!isSourceOf(node, matcher))
          return

        for (const specifier of node.specifiers) {
          if (!specifier.local.name.startsWith(prefix)) {
            context.report({
              loc: specifier.loc,
              messageId: 'missingIconComponentPrefix',
              data: {
                prefix,
              },
              fix(fixer) {
                const caseMiss = RegExp(`^${prefix}`, 'i').test(specifier.local.name)
                let code = prefix + (caseMiss ? specifier.local.name.substring(prefix.length) : specifier.local.name)

                if (specifier.type === AST_NODE_TYPES.ImportSpecifier && !isAliasImportSpecifier(specifier))
                  code = `${specifier.local.name} as ${code}`

                return fixer.replaceText(specifier.local, code)
              },
            })
          }
        }
      },
    }
  },
})
