'use strict';

const config = require('../config.js');

const GITHUB_REPOSITORY_REGEXP =
  /git\+https:\/\/github.com\/([a-zA-Z0-9\-]+)\/([a-zA-Z0-9\-]+)\.git/;

module.exports = (packageConf) => {
  const metapakData = packageConf.metapak && packageConf.metapak.data ?
    packageConf.metapak.data :
    {};

  packageConf.author = 'Sébastien Elet';
  packageConf.license = 'MIT';
  packageConf.version = packageConf.version || '0.0.0';
  packageConf.engines = { node: '>=' + config.lastNodeLTS };
  packageConf.scripts = packageConf.scripts || {};
  packageConf.scripts.changelog = 'conventional-changelog -p angular -i CHANGELOG.md -s';
  packageConf.scripts.version = 'npm run changelog && git add CHANGELOG.md';

  // If testsFiles are declared, this set up the whole code
  // quality measuring tools
  if(metapakData.testsFiles) {
    packageConf.scripts.test = `mocha '${metapakData.testsFiles}'`;
    packageConf.scripts.cover =
      'istanbul cover _mocha --report html' +
      ` -- '${metapakData.testsFiles}' -R spec -t 5000`;
  }

  if(metapakData.files) {
    packageConf.scripts.lint = `eslint '${metapakData.files}'`;
  }

  packageConf.scripts.preversion = 'npm t && npm run lint';
  packageConf.dependencies = packageConf.dependencies || {};
  // Add the MUST HAVE dev dependencies
  packageConf.devDependencies = packageConf.devDependencies || {};
  packageConf.devDependencies.eslint = '3.17.0';
  packageConf.devDependencies['eslint-config-simplifield'] = '4.4.0';
  packageConf.devDependencies['cz-conventional-changelog'] = '2.0.0';
  packageConf.devDependencies['conventional-changelog-cli'] = '1.2.0';

  return packageConf;
};
