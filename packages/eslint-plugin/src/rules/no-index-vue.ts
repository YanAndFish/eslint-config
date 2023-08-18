import { basename } from 'node:path'
import { createRule } from '../utils'

type Options = []
type MessageIds = 'noIndexVue'

export const name = 'no-index-vue'

export default createRule<Options, MessageIds>({
  name,
  meta: {
    type: 'problem',
    docs: {
      description: '',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      noIndexVue: 'Do not use index.vue',
    },
  },
  defaultOptions: [],
  create: (context) => {
    return {
      Program() {
        if (basename(context.getFilename()).toLocaleLowerCase() === 'index.vue') {
          context.report({
            loc: {
              line: 1,
              column: 0,
            },
            messageId: 'noIndexVue',
          })
        }
      },
    }
  },
},
)
