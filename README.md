# gulp-template

#### I Favicons

Для фавиконок используй сайт [https://favicon.io/](https://favicon.io/). Cкаченный файл нужно распаковать в директорию `src/asssets/favicons` и перезапустить сборку Gulp.

#### II Sprite

Пример использования спрайта в HTML разметке.

```html
<svg width="32" height="32">
  <use href="assets/icons/sprite.svg#grater"></use>
</svg>
```

#### III Image

Путь `src` для добавления картинки в HTML разметку.

```html
<img src="assets/images/logo.svg" />
```

#### IV Fonts

Путь `src` для добавления шрифта.

```scss
@font-face {
  font-family: 'Roboto';
  src: url('../assets/fonts/Roboto-Regular.woff2') format('woff2'), url('../assets/fonts/Roboto-Regular.woff')
      format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```
