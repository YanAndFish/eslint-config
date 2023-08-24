import { createRule, isSourceOfRegExp } from '../utils'

type Options = []
type MessageIds = 'noCjsIconCompnoent'
export const name = 'no-cjs-icon-component'

const singleIconComponentRE = /^@(r|v|v2)icons/i

function parse(source: string) {
  const [org, iconSet, es, ...seg] = source.split('/')

  const shouldFix = iconSet !== 'utils' && !['es', '', undefined].includes(es?.trim()?.toLocaleLowerCase())

  const fixSource = () => {
    if (!shouldFix)
      return source

    const fixed = [org, iconSet, 'es']

    if (es?.trim()?.toLocaleLowerCase() !== 'lib')
      fixed.push(es)

    fixed.push(...seg)
    return fixed.join('/')
  }

  return {
    org,
    iconSet,
    isUtil: iconSet === 'utils',
    shouldFix,
    fixSource,
  }
}

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
      noCjsIconCompnoent: 'Do not import icon components maybe cjs.',
    },
  },
  defaultOptions: [],
  create: (context) => {
    return {
      ImportDeclaration(node) {
        if (!isSourceOfRegExp(node, singleIconComponentRE))
          return

        const { shouldFix, fixSource } = parse(node.source.value)

        if (shouldFix) {
          context.report({
            messageId: 'noCjsIconCompnoent',
            node,
            fix(fixer) {
              return fixer.replaceText(node.source, `'${fixSource()}'`)
            },
          })
        }
      },
    }
  },
})
