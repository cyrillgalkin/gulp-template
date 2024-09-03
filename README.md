# gulp-template

#### I Favicons

Для фавиконок используй сайт [https://favicon.io/](https://favicon.io/). Cкаченный файл нужно распаковать в директорию `src/asssets/favicons` и перезапустить сборку Gulp.

#### II Sprite

Пример использования спрайта в HTML разметке.

```html
<svg width="32" height="32">
  <use href="assets/icons/sprite.svg#sequence"></use>
</svg>
```

#### III Image

Добавление тега `picture` в HTML разметку.

```html
<picture>
  <source
    srcset="assets/images/star@1x.avif 1x, assets/images/star@2x.avif 2x"
    type="image/avif" />
  <source
    srcset="assets/images/star@1x.webp 1x, assets/images/star@2x.webp 2x"
    type="image/webp" />
  <img
    class="products__image"
    width="250"
    height="auto"
    src="assets/images/star@1x.png"
    srcset="assets/images/star@2x.png 2x"
    alt="На изображении изображена звезда, покрытая золотом." />
</picture>
```

#### IV Fonts

Путь `src` для добавления шрифта.

```scss
@font-face {
  font-family: 'Roboto';
  src:
    url('../assets/fonts/Roboto-Regular.woff2') format('woff2'),
    url('../assets/fonts/Roboto-Regular.woff') format('woff');
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}
```
