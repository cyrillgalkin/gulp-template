import { parallel, series, watch } from 'gulp';
import { cleanBuild } from './gulp/tasks/clean.js';
import {
  optimizeJpg,
  optimizePng,
  optimizeSvg,
} from './gulp/tasks/optimize.js';
import { createAvif, createWebp } from './gulp/tasks/create.js';
import {
  copyFonts,
  convertToWoff,
  convertToWoff2,
} from './gulp/tasks/convert.js';

function startWatching() {
  watch(
    'raw/fonts/*.{ttf,woff,woff2}',
    parallel(copyFonts, convertToWoff, convertToWoff2)
  );
  watch('raw/**/*.svg', optimizeSvg);
  watch(
    'raw/images/*.{jpg,jpeg}',
    series(optimizeJpg, parallel(createAvif, createWebp))
  );
  watch(
    'raw/images/*.png',
    series(optimizePng, parallel(createAvif, createWebp))
  );
}

export const development = series(
  cleanBuild,
  parallel(copyFonts, convertToWoff, convertToWoff2),
  parallel(optimizeSvg, optimizeJpg, optimizePng),
  parallel(createAvif, createWebp),
  startWatching
);
