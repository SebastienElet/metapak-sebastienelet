'use strict';

const config = require('../config.js');
const renameDotFiles = (file) => {
  if(file.name.startsWith('_dot_')) {
    file.name = file.name.replace('_dot_', '.');
  }
};
const addCopyright = (file) => {
  if('LICENSE' === file.name) {
    file.data = file.data.replace(/<copyright holders>/mg, 'Sébastien Elet');
  }
};
const travisConfig = (file, packageConf) => {
  if('.travis.yml' === file.name) {
    const lastNodeLTSMajorPart = parseInt(config.lastNodeLTS.split('.')[0], 10);
    const lastNodeMajorPart = parseInt(config.lastNode.split('.')[0], 10);

    for(let i = 0; i <= lastNodeMajorPart - lastNodeLTSMajorPart; i++) {
      if(0 === i) {
        file.data += `  - ${lastNodeLTSMajorPart}\n`;
        continue;
      }
      file.data += `  - ${(lastNodeLTSMajorPart + i)}\n`;
    }
  }
};

module.exports = (file, packageConf) => {
  // Rename dot files the right way
  renameDotFiles(file);

  // Add author to the license
  addCopyright(file);

  travisConfig(file);

  // Set files to code climate
  if('.codeclimate.yml' === file.name) {
    if(
      packageConf.metapak &&
      packageConf.metapak.data &&
      packageConf.metapak.data.files
    ) {
      file.data = file.data.replace(/\*\*\.js/mg, packageConf.metapak.data.files);
    }
  }

  return file;
};
