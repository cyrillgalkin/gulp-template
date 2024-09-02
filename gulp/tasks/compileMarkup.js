import { src, dest } from 'gulp';
import browserSync from 'browser-sync';
import htmlmin from 'gulp-html-minifier-terser';
import plumber from 'gulp-plumber';
import htmlhint from 'gulp-htmlhint';

function compileMarkupInDev() {
  return src('src/pages/*', { base: 'src/pages' })
    .pipe(plumber())
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.reporter())
    .pipe(dest('build'))
    .pipe(browserSync.stream());
}

function compileMarkupInProd() {
  return src('src/pages/*', { base: 'src/pages' })
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest('build'));
}

export { compileMarkupInDev, compileMarkupInProd };
