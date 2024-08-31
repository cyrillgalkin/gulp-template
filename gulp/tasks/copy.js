import { src, dest } from 'gulp';
import changed from 'gulp-changed';

function copyFonts() {
  return src('src/assets/fonts/*.{woff,woff2}')
    .pipe(changed('build/assets/fonts'))
    .pipe(dest('build/assets/fonts'));
}

function copyImages() {
  return src('src/assets/images/*')
    .pipe(changed('build/assets/images'))
    .pipe(dest('build/assets/images'));
}

function copyAssets() {
  return src(['src/assets/**/*', '!src/assets/icons/**'], {
    base: 'src',
  }).pipe(dest('build'));
}

export { copyFonts, copyAssets, copyImages };
