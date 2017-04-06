'use strict';

const config = require('../config.js');

const initData = packageConf => packageConf.metapak && packageConf.metapak.data ?
  packageConf.metapak.data :
  {};

const dependencies = (packageConf) => {
  packageConf.dependencies = packageConf.dependencies || {};
};

const devDependencies = (packageConf) => {
  packageConf.devDependencies = packageConf.devDependencies || {};
  packageConf.devDependencies.eslint = '3.19.0';
  packageConf.devDependencies['eslint-config-simplifield'] = '5.0.1';
  packageConf.devDependencies['cz-conventional-changelog'] = '2.0.0';
  packageConf.devDependencies['conventional-changelog-cli'] = '1.3.1';
};


module.exports = (packageConf) => {
  const metapakData = initData(packageConf);

  packageConf.author = 'Sébastien Elet';
  packageConf.license = 'MIT';
  packageConf.version = packageConf.version || '0.0.0';
  packageConf.engines = { node: `>=${config.lastNodeLTS}` };
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

  dependencies(packageConf);
  // Add the MUST HAVE dev dependencies
  devDependencies(packageConf);

  return packageConf;
};
