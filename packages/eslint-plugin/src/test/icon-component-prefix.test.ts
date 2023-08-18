import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { name } from '../rules/icon-component-prefix'

// should pass
const valids = [
  'import Iconbar from \'@vicons/antd\'',
  'import {} from \'@vicons/antd\'',
  'import { IconFoo } from \'@vicons/antd\'',
  'import { asd } from \'other\'',
]

// should fail
const invalids = [
  [
    'import bar from \'@vicons/antd\'',
    'import Iconbar from \'@vicons/antd\'',
  ],
  [
    'import { bar } from \'@vicons/antd\'',
    'import { bar as Iconbar } from \'@vicons/antd\'',
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
    errors: [{ messageId: 'missingIconComponentPrefix' }],
  })),
})
