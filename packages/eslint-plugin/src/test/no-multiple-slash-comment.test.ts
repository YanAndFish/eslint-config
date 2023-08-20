import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { name } from '../rules/no-multiple-slash-comment'

// should pass
const valids = [
  '// foo',
  '// /// foo',
  '// foo /////',
  '// foo/// bar',
  '// ////foo',
  '//foo',
  '/// <reference types="vite/client" />',
  '/// <amd-module />   ',
]
// should fail
const invalids = [
  [
    '/// foo',
    '// foo',
  ],
  [
    '///////////  foo',
    '//  foo',
  ],
  ['///foo', '//foo'],
  [
    '/// <amd-module />   sss',
    '// <amd-module />   sss',
  ],
  [
    '///////// <reference types="vite/client" />',
    '// <reference types="vite/client" />',
  ],
]

const ruleTester: RuleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
})

ruleTester.run(name, rule as any, {
  valid: valids.map(e => ({
    code: '',
    filename: e,
  })),
  invalid: invalids.map(i => ({
    code: i[0],
    output: i[1].trim(),
    errors: [{ messageId: 'noMultipleSlashComment' }],
  })),
})
