'use strict';

const assert = require('assert');
const packageTransformer = require('./package');

describe('Package transformer', () => {
  it('should work with an empty package.json', () => {
    assert.deepEqual(
      packageTransformer({}),
      {
        author: 'Sébastien Elet',
        dependencies: {},
        devDependencies: {
          'conventional-changelog-cli': '1.2.0',
          'cz-conventional-changelog': '2.0.0',
          eslint: '3.17.0',
          'eslint-config-simplifield': '4.4.0',
        },
        engines: {
          node: '>=6',
        },
        license: 'MIT',
        scripts: {
          preversion: 'npm t && npm run lint',
          version: 'npm run changelog && git add CHANGELOG.md',
          changelog: 'conventional-changelog -p angular -i CHANGELOG.md -s',
        },
        version: '0.0.0',
      }
    );
  });
});
