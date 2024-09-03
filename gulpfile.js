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
  copyFaviconsFromRaw,
  copyFaviconsFromSrc,
  copyFontsFromRaw,
  copyFontsFromSrc,
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
import {
  compileScriptsInDev,
  compileScriptsInProd,
} from './gulp/tasks/compileScripts.js';

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
    'raw/fonts/*.ttf',
    series(parallel(convertToWoff, convertToWoff2), copyFontsFromSrc)
  );
  watch('raw/fonts/*.{woff,woff2}', series(copyFontsFromRaw, copyFontsFromSrc));
  watch('raw/icons/*.svg', optimizeSvg);
  watch('src/assets/icons/*.svg', createSprite);
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
  watch('src/scripts/**', compileScriptsInDev);
}

export const optimization = series(
  cleanBuild,
  copyFaviconsFromRaw,
  copyFontsFromRaw,
  parallel(convertToWoff, convertToWoff2),
  parallel(optimizeSvg, optimizeJpg, optimizePng),
  parallel(createAvif, createWebp),
  createSprite,
  copyAssets,
  copyFaviconsFromSrc,
  compileMarkupInDev,
  compileStylesInDev,
  compileScriptsInDev,
  startWatching
);

export const development = series(
  cleanBuild,
  copyFaviconsFromRaw,
  copyFontsFromRaw,
  parallel(convertToWoff, convertToWoff2),
  parallel(optimizeSvg, optimizeJpg, optimizePng),
  parallel(createAvif, createWebp),
  createSprite,
  copyAssets,
  copyFaviconsFromSrc,
  compileMarkupInDev,
  compileStylesInDev,
  compileScriptsInDev,
  startWatching
);

export const production = series(
  cleanBuild,
  createSprite,
  copyAssets,
  copyFaviconsFromSrc,
  compileMarkupInProd,
  compileStylesInProd,
  compileScriptsInProd
);
