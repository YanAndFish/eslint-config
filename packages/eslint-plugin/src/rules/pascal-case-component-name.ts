import { basename } from 'node:path'
import { pascalCase, pascalCaseTransformMerge } from 'pascal-case'
import { createRule } from '../utils/common'

type Options = [string | string[]]
type MessageIds = 'missingPascalCaseComponentName'

export const name = 'pascal-case-component-name'

export default createRule<Options, MessageIds>({
  name,
  meta: {
    type: 'suggestion',
    docs: {
      description: '',
      recommended: 'recommended',
    },
    schema: [
      {
        type: ['string', 'array'],
        description: 'Component file extensions',
      },
    ],
    messages: {
      missingPascalCaseComponentName: 'Component name must be PascalCase. e.g. {{pascalCase}}',
    },
  },
  defaultOptions: ['vue'],
  create: (context, options) => {
    return {
      Program() {
        const baseName = basename(context.getFilename())
        if (!RegExp(`\\.(${Array.isArray(options[0]) ? options[0].join('|') : options[0]})$`).test(baseName))
          return

        const fileName = baseName.split('.')[0]
        const pascalCaseName = pascalCase(fileName, { transform: pascalCaseTransformMerge })

        if (fileName !== pascalCaseName) {
          context.report({
            loc: {
              line: 1,
              column: 0,
            },
            messageId: 'missingPascalCaseComponentName',
            data: {
              pascalCase: pascalCaseName + baseName.slice(fileName.length),
            },
          })
        }
      },
    }
  },
},
)
