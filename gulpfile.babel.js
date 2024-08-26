import { parallel, series } from 'gulp';
import { cleanBuildFolder } from './gulp/tasks/clean.js';
import {
  optimizeJpg,
  optimizePng,
  optimizeSvg,
} from './gulp/tasks/optimize.js';
import { createAvif, createWebp } from './gulp/tasks/create.js';

export const optimization = series(
  parallel(optimizeJpg, optimizePng, optimizeSvg),
  parallel(createWebp)
);
export const development = series(cleanBuildFolder);
