import { src, dest } from 'gulp';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import changed from 'gulp-changed';

function copyFonts() {
  return src('raw/fonts/*.{woff,woff2}')
    .pipe(changed('src/assets/fonts'))
    .pipe(dest('src/assets/fonts'));
}

function convertToWoff() {
  return src('raw/fonts/*.ttf', {
    encoding: false, // Important!
    removeBOM: false,
  })
    .pipe(changed('src/assets/fonts', { extension: '.woff' }))
    .pipe(ttf2woff())
    .pipe(dest('src/assets/fonts'));
}

function convertToWoff2() {
  return src('raw/fonts/*.ttf', {
    encoding: false, // Important!
    removeBOM: false,
  })
    .pipe(changed('src/assets/fonts', { extension: '.woff2' }))
    .pipe(ttf2woff2())
    .pipe(dest('src/assets/fonts'));
}

export { copyFonts, convertToWoff, convertToWoff2 };
