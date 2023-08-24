import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { name } from '../rules/no-cjs-icon-component'

// should pass
const valids = [
  'import Iconbar from \'vue/foo/bar\'',
  'import foo from \'@vicons/antd/es/\'',
  'import foo from \'@vicons/antd/es\'',
  'import foo from \'@vicons/antd/\'',
  'import foo from \'@vicons/antd\'',
]

// should fail
const invalids = [
  [
    'import foo from \'@vicons/antd/lib/Foo\'',
    'import foo from \'@vicons/antd/es/Foo\'',
  ],
  [
    'import foo from \'@vicons/antd/Foo\'',
    'import foo from \'@vicons/antd/es/Foo\'',
  ],
]

const ruleTester: RuleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
})

ruleTester.run(name, rule as any, {
  valid: valids,
  invalid: invalids.map(i => ({
    code: i[0],
    output: i[1].trim(),
    errors: [{ messageId: 'noCjsIconCompnoent' }],
  })),
})
