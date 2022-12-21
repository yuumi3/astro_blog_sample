---
title: 次の開発用Macはどうしようかな？
---

ややネタ切れ感があり、今回も雑談です。  
私は現在ソフトウェア開発等には21インチのiMacを使ってをいますが、[導入当時のブログ](/blog_archive/2020/04/08/macbook-pro-to-imac/)を見ると購入してから3年近くたっています。今のところ問題はないですが、来春には次の開発マシンを考えても良い時期です。

![パソコン](/images/pcs.png)

### MacBook Pro から iMacへの変更は正解でした

導入当時のブログ[MacbookProからiMacに変更したら思わぬ問題が・・・](/blog_archive/2020/04/08/macbook-pro-to-imac/)にも書きましたが、3年近く使いMacBook ProからiMacへの変更は大正解でした。

当初はモニターに違和感もありましたが、台の購入や設定の変更で慣れました。性能的には満足で家（＝オフィス）でしか使わない場合はiMacお薦めです。  
導入当時のブログでは指紋認証が出来ない事をあげましたが、[最新のiMac](https://www.apple.com/jp/imac-24/)には指紋認証が付いていますね。

### iMacは良いが Mac mini や Mac Studioなどの選択肢もあるね

iMacの欠点を今考えると、大きい事でしょうか？　たとえば、新しいMacを買った後もこのiMacをバックアップ機として置いておこうと思うと、それなりの場所が必要になります。モニターが別のマシンなら、モニター無し、または小さいモニターに付け替えれば部屋の隅に置けますが・・・ さらに誰かに譲るのに宅配で送れるのだろうか？など考えてしまいます。

据え置き型のMacにはiMac以外に、[Mac mini](https://www.apple.com/jp/mac-mini/)や[Mac Studio](https://www.apple.com/jp/mac-studio/)などがあります。これらと適当なモニターを買うのも良いかも知れません。

### Intel Docker、 VM はどうしようか

さて、現在使っているiMacはIntel CPUです。しかし今（今後）買えるMacはApple silicon(ARMアーキテクチャ)
の[M1](https://ja.wikipedia.org/wiki/Apple_M1)や[M2](https://ja.wikipedia.org/wiki/Apple_M2)です。現在Macで使っている大抵のソフトはARMアーキテクチャ版も用意されていて問題ありませんが、VMWareやDockerは少し問題があります。

VMWareやDocker本体にはARMアーキテクチャ版がありますが、現在あるIntel用イメージはARMアーキテクチャでは動きません。DockerはARM用イメージがあればリビルドする事で使えそうです、また[Rosetta 2](https://ja.wikipedia.org/wiki/Rosetta)を使いIntelイメージをARM用に変換して動かす事ができるようですが、やや不安があります。 Intel版のVMWareイメージに関しては移行手段は無いようです。

現状でこの問題を解決する1つの方法は、IntelやAMD CPUのPCを購入しWindowsまたはLinuxが動くサーバーを用意する事でしょうか？　仕事の上でもWindows環境を持っていた方が良いこともあるので [ミニPC （Amazonページへのリンクです）](https://www.amazon.co.jp/s?k=ミニPC)のようなものを買うのもよいかもしれませんね。
