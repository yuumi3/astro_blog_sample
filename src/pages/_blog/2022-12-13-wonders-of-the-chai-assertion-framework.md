---
title: Chai アサーション フレームワークの不思議
---


現在関わっているJavaScriptの仕事でのテストコードは[Mocha](https://github.com/mochajs/mocha) + [Chai](https://github.com/chaijs/chai)を使って書いています。
[Chai](https://github.com/chaijs/chai)のBDDスタイルでは

```js
expect(1 + 1 == 2).to.be.true;
```
のような書き方になります。このコードって不思議ではありませんか？

```js
expect(1 + 1).to.equal(2);
```

なら、`expect`関数でテスト対象の`1 + 1`を計算し、その結果が`2`に等しいかを`equal`関数で検証しています。しかし最初のコードでは`expect`関数の値を検証する関数がありません。`to` も `be` 、`true`も`expect`関数の戻すオブジェクトのプロパティーの値です（プロパティーの値のオブジェクトのプロパティー、さらにそのプロパティーの・・・）。


![Chai](/images/Masala-Chai.jpg)

### なぜこんな表記なのか (BDD)

そもそもなぜ `expect(1 + 1 == 2).to.be.true` このような記法で書くのでしょうか？　`assert.ok(1 + 1 == 2)` でも良いのではと思う方もいると思います。  
このように書くのは[BDD(behavior driven development, ビヘイビア駆動開発)](https://ja.wikipedia.org/wiki/%E3%83%93%E3%83%98%E3%82%A4%E3%83%93%E3%82%A2%E9%A7%86%E5%8B%95%E9%96%8B%E7%99%BA)という、テストコードはプログラムの振る舞いを記述したコードだという思想から生まれてきた表記です。振る舞いを記述したものなので、より人間の言語（英語）に近い記法を目指しています。

BDDが知られるようになったのはRuby言語用の、[RSpec](https://en.wikipedia.org/wiki/RSpec)からではないでしょうか？　RSpecで今回のコードは以下のように書きます。  
ちなみにこれをGoogle翻訳すると「（1 + 1 == 2）が真であることを期待する」になります。😁

```ruby
expect(1 + 1 == 2).to be true
```
Ruby言語には関数呼び出しの`()`を省略できるという珍しい特徴があります、上のコードに関数呼び出しの`()`を追加すると以下のようになり、`to`や`be`が関数（メソッド）だとわかります。

```ruby
expect(1 + 1 == 2).to(be(true))
```

ちなみに、以前のJavaScriptのプロジェクトでテストコードは[Jest](https://github.com/facebook/jest)を使っていました。Jestでは以下のようにRSpecに似せてますが、無理のない関数呼び出しのチェーンです。😅

```js
expect(1 + 1 == 2).toBeTruthy();
```

### どう実装されているか (Proxy)


さて `expect(1 + 1 == 2).to.be.true;`はどうやって検証処理を実行しているのでしょうか？

JavaScriptに詳しい方は [Proxy](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Proxy) を使っているのでは？と想像するかと思います、
実際に[Chai](https://github.com/chaijs/chai)のコードを見てみるとProxyを使っていました。  
[Proxy](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Proxy)は、指定したオブジェクトの持つメソッドをフック（インターセプト）するコードを追加したオブジェクトを作成してくれます。Proxyを使うとプロパティー参照時に実行される処理を組み込めるのです。

実際のコードは複雑なので`expect(1 + 1 == 2).to.be.true`を検証できる簡単なコード作ってみました。下のコードを実行するとコンソールに`Assertion :  OK`が2回表示されます（⑧、⑨）。

```js
const booleanProxy = (value) => {    // ← ①
  return new Proxy(                  // ← ②
    {true: true, false: false},      // ← ③
    {get: (target, prop) =>          // ← ④
      {console.log("Assertion : ", value === target[prop] ? "OK" : "NG");} // ← ⑤
    }
  );
};

const expect = (value) => {                // ← ⑥
  return {to: {be: booleanProxy(value)}};  // ← ⑦
};

expect(1 + 1 == 2).to.be.true;             // ← ⑧
expect(1 + 1 == 3).to.be.false;            // ← ⑨
```

- ① : ③で定義されたオブジェクトをProxyしたオブジェクトを戻す関数の定義
   - 引数valueは、テスト対象の値
- ② : [Proxy](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Proxy)の作成、詳細はリンク先を参照してください
- ③ : 元になるオブジェクト`true` 、 `false`のプロパティーを持ちます
- ④ : プロパティー参照時に実行される`getter(get)`の定義
   - 引数targetは、参照対象のオブジェクト
   - 引数propは、参照されるプロパティー名
- ⑤ : getterの処理
   - value（＝ `export`関数の引数）がプロパティーと等しければ`Assertion :  OK`、等しくなければ`Assertion :  NG`がコンソールに表示されます
- ⑥ : `export`関数の定義
   - 引数valueは、テスト対象の値
- ⑦ : `export`関数の戻り値は、`{to: {be: booleanProxyの値}}`
   - 今回は、`to`プロパティーの処理は省いています
   - 本物のChaiでは`to`プロパティーもProxyです
- ⑧ : テストの記述1
- ⑨ : テストの記述2


### まとめ

[Proxy](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Proxy)は通常のアプリケーションでは使う事はないと思いますが、フレームワークや基本的なライブラリーでは良く使われいる強力な機能です。  
[メタプログラミング](https://ja.wikipedia.org/wiki/%E3%83%A1%E3%82%BF%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0)が好きな方はぜひ使ってみてくさい、ただし**ご利用は計画的に**😁
