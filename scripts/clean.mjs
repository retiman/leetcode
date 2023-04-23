import * as fs from 'fs';
import * as fse from 'fs-extra';

if (fs.existsSync('build')) {
  fse.rmSync('build', { recursive: true });
}
