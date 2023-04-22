import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as glob from '@actions/glob';
import * as path from 'path';

async function rm(pattern) {
  console.log(`Removing ${pattern}`);
  const globber = await glob.create(pattern);
  const files = await globber.glob();
  files.forEach(file => {
    fs.rmSync(file);
    console.log(`Removed ${file}`);
  });
}

async function rmdir(directory) {
  if (!fs.existsSync(directory)) {
    return;
  }

  fse.emptyDirSync(directory);
  fs.rmdirSync(directory);
  console.log(`Removed ${directory}`);
}

rmdir('build');
rmdir('coverage');
rmdir('dist');
rmdir(path.join('src', 'schema'));
rmdir('tmp');
await rm('*.tgz');
