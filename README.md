# Astroを使ったブログサイトのサンプル

[Astro](https://astro.build)を使って作った簡単なブログサイトのサンプルです。


## 構造

ブログ記事は以下のようなファイル構造になっています。

- 記事はMarkdownで書かれています
- ファイル名の最初の `yyyy-mm-dd` が日付になります。

```txt
└── src
    └── pages
        └── _blog
            ├── 2022-12-01-thought-about-reskilling.md
            ├── 2022-12-06-what-about-my-next-development-mac.md
            └── 2022-12-13-wonders-of-the-chai-assertion-framework.md
```

開発環境でのURLは以下のようになっています。

- `http://localhost:3000/blog` ブログ一覧
- `http://localhost:3000/blog/2022/12/01/thought-about-reskilling` 最初のブログ記事
- `http://localhost:3000/blog/2022/12/06/what-about-my-next-development-mac` 2番目のブログ記事
- `http://localhost:3000/blog/2022/12/13/wonders-of-the-chai-assertion-framework`  3番目のブログ記事

## 使い方

インストール

```sh
$ git clone git@github.com:yuumi3/astro_blog_sample.git
$ cd astro_blog_sample
$ npm install
```

開発環境の起動

```sh
$ npm run dev
```


公開用サイトの構築

```sh
$ npm run build
```

`./dist` ディレクトリーに公開用のHTML/CSS/画像が生成されます

## License

[MIT License](http://www.opensource.org/licenses/MIT).