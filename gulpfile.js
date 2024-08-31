import { parallel, series, watch } from 'gulp';
import { cleanBuild } from './gulp/tasks/clean.js';
import {
  optimizeJpg,
  optimizePng,
  optimizeSvg,
} from './gulp/tasks/optimize.js';
import { createAvif, createSprite, createWebp } from './gulp/tasks/create.js';
import { convertToWoff, convertToWoff2 } from './gulp/tasks/convert.js';
import { copyAssets, copyFonts, copyImages } from './gulp/tasks/copy.js';

function startWatching() {
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
}

export const development = series(
  cleanBuild,
  parallel(copyFonts, convertToWoff, convertToWoff2),
  parallel(optimizeSvg, optimizeJpg, optimizePng),
  parallel(createAvif, createWebp),
  copyAssets,
  createSprite,
  startWatching
);
