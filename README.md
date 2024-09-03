# gulp-template

#### I Favicons

Для фавиконок используй сайт [https://realfavicongenerator.net/](https://realfavicongenerator.net/). Cкаченный файл нужно распаковать в директорию `src/asssets/favicons`. После этого вставь предоставленный код в HTML убери лишние `/`. Вот пример корректного `src`:

```html
<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
<link rel="manifest" href="site.webmanifest" />
<link rel="mask-icon" href="safari-pinned-tab.svg" color="#5bbad5" />
<meta name="msapplication-TileColor" content="#da532c" />
<meta name="theme-color" content="#ffffff" />
```

Для того, чтобы все изменения подтянулись необходимо перезапустить сборку.

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
