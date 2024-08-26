export const srcPath = 'src';
export const buildPath = 'build';
export const rawPath = 'raw';

export const path = {
  raw: {
    svg: rawPath + '/**/*.svg',
    images: rawPath + '/**/*.{jpg,jpeg,png}',
  },
  src: {
    html: srcPath + '/pages/*.html',
    scss: srcPath + '/scss/**/*.scss',
    styles: srcPath + '/scss/styles.scss',
    scripts: srcPath + '/js/**/*.js',
    vendorScripts: srcPath + '/js/vendor/**/*.js',
    assets: srcPath + '/assets',
    favicons: srcPath + '/assets/favicons/**/*',
    fonts: srcPath + '/assets/fonts/**/*.{woff,woff2}',
    icons: srcPath + '/assets/icons/*.svg',
    images: srcPath + '/assets/images/**/*.{jpg,png,svg,webp}',
    video: srcPath + '/assets/video/**/*',
  },
  build: {
    html: buildPath,
    styles: buildPath + '/css/',
    scripts: buildPath + '/js/',
    images: buildPath + '/assets/images/',
    fonts: buildPath + '/fonts/',
    vendorScripts: buildPath + '/js/vendor/',
  },
};
