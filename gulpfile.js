import { parallel, series, watch } from 'gulp';
import { cleanBuild } from './gulp/tasks/clean.js';
import {
  optimizeJpg,
  optimizePng,
  optimizeSvg,
} from './gulp/tasks/optimize.js';
import { createAvif, createSprite, createWebp } from './gulp/tasks/create.js';
import { convertToWoff, convertToWoff2 } from './gulp/tasks/convert.js';
import {
  copyAssets,
  copyFavicons,
  copyFonts,
  copyImages,
} from './gulp/tasks/copy.js';
import browserSync from 'browser-sync';
import {
  compileMarkupInDev,
  compileMarkupInProd,
} from './gulp/tasks/compileMarkup.js';
import {
  compileStylesInDev,
  compileStylesInProd,
} from './gulp/tasks/compileStyles.js';

function startWatching() {
  browserSync.init({
    server: {
      baseDir: './build',
    },
    browser: ['firefox'],
    notify: false,
  });

  // RAW FOLDER
  watch(
    'raw/fonts/*.{ttf,woff,woff2}',
    series(parallel(convertToWoff, convertToWoff2), copyFonts)
  );
  watch('raw/icons/*.svg', series(optimizeSvg, createSprite));
  watch('raw/images/*.svg', series(optimizeSvg, copyImages));
  watch(
    'raw/images/*.{jpg,jpeg}',
    series(optimizeJpg, parallel(createAvif, createWebp), copyImages)
  );
  watch(
    'raw/images/*.png',
    series(optimizePng, parallel(createAvif, createWebp), copyImages)
  );

  // SRC FOLDER
  watch('src/pages/**', compileMarkupInDev);
  watch('src/styles/**', compileStylesInDev);
}

export const development = series(
  cleanBuild,
  parallel(convertToWoff, convertToWoff2),
  parallel(optimizeSvg, optimizeJpg, optimizePng),
  parallel(createAvif, createWebp),
  createSprite,
  copyAssets,
  copyFavicons,
  compileMarkupInDev,
  compileStylesInDev,
  startWatching
);

export const production = series(
  cleanBuild,
  createSprite,
  copyAssets,
  copyFavicons,
  compileMarkupInProd,
  compileStylesInProd
);
