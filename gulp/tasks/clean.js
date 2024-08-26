import { src } from 'gulp';
import { buildPath } from '../gulp-config.js';
import clean from 'gulp-clean';
import { existsSync } from 'fs';

function cleanBuildFolder(done) {
  if (existsSync(buildPath)) {
    return src(buildPath, { read: false }).pipe(clean());
  }
  done();
}

export { cleanBuildFolder };