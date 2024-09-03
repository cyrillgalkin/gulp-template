import { src, dest } from 'gulp';
import through2 from 'through2';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import svgstore from 'gulp-svgstore';
import rename from 'gulp-rename';

function hasFiles(dir, extensions) {
  // Проверяем, существует ли директория
  if (!fs.existsSync(dir)) {
    return false; // Если директории нет, возвращаем false
  }
  return extensions.some((ext) =>
    fs.readdirSync(dir).some((file) => file.endsWith(`.${ext}`))
  );
}

// Общая функция для обработки изображений
const processImage = async (file, options) => {
  // Проверка существования исходного файла

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

function createWebp(done) {
  // Проверка наличия файлов перед началом обработки
  if (!hasFiles('src/assets/images', ['jpg', 'jpeg', 'png'])) {
    console.log('Нет подходящих файлов для обработки.');
    done();
  }

  return src('src/assets/images/*.{jpg,jpeg,png}', { allowEmpty: true })
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

function createAvif(done) {
  // Проверка наличия файлов перед началом обработки
  if (!hasFiles('src/assets/images', ['jpg', 'jpeg', 'png'])) {
    console.log('Нет подходящих файлов для обработки.');
    done();
  }

  return src('src/assets/images/*.{jpg,jpeg,png}', { allowEmpty: true })
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

function createSprite(done) {
  // Проверка наличия файлов перед началом обработки
  if (!hasFiles('src/assets/icons', ['svg'])) {
    console.log('Нет подходящих файлов для обработки.');
    done();
  }

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
