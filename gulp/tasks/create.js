import { src, dest } from 'gulp';
import through2 from 'through2';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import svgstore from 'gulp-svgstore';
import rename from 'gulp-rename';

// Общая функция для обработки изображений
const processImage = async (file, options) => {
  const { format, sharpOptions } = options;
  const filePath = file.path;
  const fileBase = path.basename(filePath, path.extname(filePath));
  const fileDir = path.dirname(filePath);
  const outputPath = path.join(fileDir, `${fileBase}.${format}`);

  // Проверка существования файла
  if (fs.existsSync(outputPath)) {
    return null;
  }

  const image = sharp(file.path);
  const buffer = await image[format](sharpOptions).toBuffer();
  const processedFile = file.clone();
  processedFile.contents = buffer;
  processedFile.path = outputPath;

  return processedFile;
};

function createWebp() {
  return src('src/assets/images/*.{jpg,jpeg,png}')
    .pipe(
      through2.obj(async function (file, enc, cb) {
        if (file.isBuffer()) {
          try {
            const processedFile = await processImage(file, {
              format: 'webp',
              sharpOptions: {
                smartSubsample: true,
              },
            });
            if (processedFile) this.push(processedFile);
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
}

function createAvif() {
  return src('src/assets/images/*.{jpg,jpeg,png}')
    .pipe(
      through2.obj(async function (file, enc, cb) {
        if (file.isBuffer()) {
          try {
            const processedFile = await processImage(file, {
              format: 'avif',
              sharpOptions: {
                // effort: 6,
              },
            });
            if (processedFile) this.push(processedFile);
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
}

function createSprite() {
  return src('src/assets/icons/*')
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename('sprite.svg'))
    .pipe(dest('build/assets/icons'));
}

export { createWebp, createAvif, createSprite };
