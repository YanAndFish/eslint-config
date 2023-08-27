import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { name } from '../rules/no-default-import'

// should pass
const valids = [
  'import foo from \'bar\'',
  'import { foo } from \'foo\'',
  'import foo from \'foobar\'',
  'import foo from \'foo/bar\'',
  'import * as foo from \'@foo/bar\'',
  'import * as foo from \'bar\'',
  'import type foo from \'foo\'',
]
// should fail
const invalids = [
  [
    'import foo from \'foo\'',
    'noDefaultImport',
  ],
  [
    'import foo from \'FoO\'',
    'noDefaultImport',
  ],
  [
    'import * as foo from \'foo\'',
    'noWrokspaceImport',
  ],
  [
    'import * as foo from \'Foo\'',
    'noWrokspaceImport',
  ],
]

const ruleTester: RuleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
})

ruleTester.run(name, rule as any, {
  valid: valids.map(e => ({
    options: ['foo'],
    code: e,
  })),
  invalid: invalids.map(e => ({
    options: ['foo'],
    code: e[0],
    errors: [{ messageId: e[1] }],
  })),
})
