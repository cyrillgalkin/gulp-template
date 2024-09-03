import { src } from 'gulp';
import clean from 'gulp-clean';
import { existsSync } from 'fs';

function cleanBuild(done) {
  if (existsSync('build')) {
    return src('build', { read: false }).pipe(clean());
  }
  done();
}

export { cleanBuild };
