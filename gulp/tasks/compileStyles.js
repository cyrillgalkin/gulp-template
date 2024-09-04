import { src, dest } from 'gulp';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import postсss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import sortMediaQueries from 'postcss-sort-media-queries';

const sassModule = gulpSass(dartSass);

function compileStylesInDev() {
  return src('src/styles/styles.scss', { base: 'src', sourcemaps: true })
    .pipe(plumber())
    .pipe(sassModule().on('error', sassModule.logError))
    .pipe(dest('build', { sourcemaps: true }))
    .pipe(browserSync.stream());
}

function compileStylesInProd() {
  const plugins = [
    sortMediaQueries({
      sort: 'mobile-first', // default
    }),
    autoprefixer(),
    cssnano({
      preset: [
        'default',
        { discardComments: { removeAll: true }, mergeRules: true },
      ],
    }),
  ];

  return src('src/styles/styles.scss', { base: 'src' })
    .pipe(sassModule())
    .pipe(postсss(plugins))
    .pipe(dest('build'));
}

export { compileStylesInDev, compileStylesInProd };
