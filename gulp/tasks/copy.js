import { src, dest } from 'gulp';
import changed from 'gulp-changed';

function copyImages() {
  return src('src/assets/images/*', { encoding: false })
    .pipe(changed('build/assets/images'))
    .pipe(dest('build/assets/images'));
}

function copyFavicons() {
  return src(
    ['src/assets/favicons/*', '!src/assets/favicons/*.{zip,rar,txt}'],
    {
      encoding: false,
    }
  )
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

export { copyAssets, copyImages, copyFavicons };