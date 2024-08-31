import { src, dest } from 'gulp';
import through2 from 'through2';
import path from 'path';
import sharp from 'sharp';
import svgo from 'gulp-svgmin';
import fs from 'fs';
import changed from 'gulp-changed';

// Общая функция для обработки изображений
const processImage = async (file, options) => {
  const { format, sharpOptions, destDir } = options;
  const filePath = file.path;
  const fileBase = path.basename(filePath, path.extname(filePath));
  const fileDir = path.dirname(filePath);

  const outputPath2x = path.join(destDir, `${fileBase}@2x.${format}`);
  const outputPath1x = path.join(destDir, `${fileBase}@1x.${format}`);

  // Проверка существования файлов
  if (fs.existsSync(outputPath2x) && fs.existsSync(outputPath1x)) {
    return null; // Пропуск обработки, если обе версии существуют
  }

  const image = sharp(file.path);
  const { width } = await image.metadata();

  // Создание версии 2x
  const buffer2x = await image[format](sharpOptions).toBuffer();
  const image2x = file.clone();
  image2x.contents = buffer2x;
  image2x.path = path.join(fileDir, `${fileBase}@2x.${format}`);

  // Создание версии 1x
  const buffer1x = await image.resize(Math.round(width * 0.5)).toBuffer();
  const image1x = file.clone();
  image1x.contents = buffer1x;
  image1x.path = path.join(fileDir, `${fileBase}@1x.${format}`);

  return [image2x, image1x];
};

const optimizePng = () =>
  src('raw/images/*.png')
    .pipe(
      through2.obj(async function (file, enc, cb) {
        if (file.isBuffer()) {
          try {
            const images = await processImage(file, {
              format: 'png',
              destDir: 'src/assets/images',
              sharpOptions: {
                progressive: true,
                compressionLevel: 9,
                adaptiveFiltering: true,
                palette: true,
                quality: 80,
              },
            });
            if (images) images.forEach((img) => this.push(img));
            cb();
          } catch (err) {
            cb(err);
          }
        } else {
          cb(null, file);
        }
      })
    )
    .pipe(dest('src/assets/images'));

const optimizeJpg = () =>
  src('raw/images/*.{jpg,jpeg}')
    .pipe(
      through2.obj(async function (file, enc, cb) {
        if (file.isBuffer()) {
          try {
            const images = await processImage(file, {
              format: 'jpeg',
              destDir: 'src/assets/images',
              sharpOptions: {
                progressive: true,
                mozjpeg: true,
                chromaSubsampling: '4:4:4',
              },
            });
            if (images) images.forEach((img) => this.push(img));
            cb();
          } catch (err) {
            cb(err);
          }
        } else {
          cb(null, file);
        }
      })
    )
    .pipe(dest('src/assets/images'));

const optimizeSvg = () =>
  src('raw/**/*.svg')
    .pipe(changed('src/assets'))
    .pipe(svgo())
    .pipe(dest('src/assets'));

export { optimizeSvg, optimizeJpg, optimizePng };
