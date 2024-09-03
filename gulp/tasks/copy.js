import { src, dest } from 'gulp';
import changed from 'gulp-changed';

function copyImages() {
  return src('src/assets/images/*', { encoding: false })
    .pipe(changed('build/assets/images'))
    .pipe(dest('build/assets/images'));
}

function copyFaviconsFromRaw() {
  return src(['raw/favicons/**/*', '!raw/favicons/*.{zip,rar,txt}'], {
    encoding: false,
  })
    .pipe(changed('src/assets/favicons'))
    .pipe(dest('src/assets/favicons'));
}

function copyFontsFromRaw() {
  return src(['raw/fonts/**/*.{woff,woff2}'], {
    encoding: false,
  })
    .pipe(changed('src/assets/fonts'))
    .pipe(dest('src/assets/fonts'));
}

function copyFaviconsFromSrc() {
  return src('src/assets/favicons/*', {
    encoding: false,
  })
    .pipe(changed('build'))
    .pipe(dest('build'));
}

function copyFontsFromSrc() {
  return src('src/assets/fonts/*', {
    base: 'src',
    encoding: false,
  })
    .pipe(changed('build'))
    .pipe(dest('build'));
}

function copyAssets() {
  return src(
    ['src/assets/**/*', '!src/assets/icons/**', '!src/assets/favicons/**'],
    {
      base: 'src',
      encoding: false,
    }
  )
    .pipe(changed('build'))
    .pipe(dest('build'));
}

export {
  copyAssets,
  copyImages,
  copyFaviconsFromRaw,
  copyFaviconsFromSrc,
  copyFontsFromRaw,
  copyFontsFromSrc,
};
