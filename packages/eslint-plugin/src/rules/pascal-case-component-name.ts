import { basename } from 'node:path'
import { pascalCase, pascalCaseTransformMerge } from 'pascal-case'
import { createRule } from '../utils'

type Options = []
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
    schema: [],
    messages: {
      missingPascalCaseComponentName: 'Vue component name must be PascalCase. e.g. {{pascalCase}}',
    },
  },
  defaultOptions: [],
  create: (context) => {
    return {
      Program() {
        const baseName = basename(context.getFilename())
        if (!baseName.endsWith('.vue'))
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
