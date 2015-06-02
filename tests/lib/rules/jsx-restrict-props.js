/**
 * @fileoverview Restrict usage of props defined in config
 * @author Jaakko Lukkari
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var eslint = require('eslint').linter;
var ESLintTester = require('eslint-tester');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('lib/rules/jsx-restrict-props', {
    valid: [
        {code: '<App notRestricted />;', args: [1, {props: ['restricted']}], ecmaFeatures: {jsx: true}},
        {code: '<App notRestricted={true} />;', args: [1, {props: ['restricted']}], ecmaFeatures: {jsx: true}}
    ],
    invalid: [
        {code: '<App restricted={true} />;', args: [1, {props: ['restricted']}],
         errors: [{message: 'Usage of restricted is restricted'}], ecmaFeatures: {jsx: true}},
        {code: '<App restricted />;', args: [1, {props: ['restricted']}],
         errors: [{message: 'Usage of restricted is restricted'}], ecmaFeatures: {jsx: true}}
    ]
});
