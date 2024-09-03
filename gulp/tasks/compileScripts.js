import { src, dest } from 'gulp';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';
import webpackStream from 'webpack-stream';

function compileScriptsInDev() {
  return src('src/scripts/index.js', { sourcemaps: true })
    .pipe(plumber())
    .pipe(babel())
    .pipe(
      webpackStream({
        mode: 'development',
      })
    )
    .pipe(dest('build/scripts', { sourcemaps: true }))
    .pipe(browserSync.stream());
}

function compileScriptsInProd() {
  return src('src/scripts/index.js')
    .pipe(babel())
    .pipe(
      webpackStream({
        mode: 'production',
      })
    )
    .pipe(dest('build/scripts'))
    .pipe(browserSync.stream());
}

export { compileScriptsInDev, compileScriptsInProd };
