### 前言

所谓布局，其实包含两个含义: 尺寸和定位。

### 尺寸相关

百分比: 百分比尺寸的计算是相对于父元素的。

浏览器尺寸改变的时候，也就是根节点 html 的长度改变，我们可以用 % 来将浏览器尺寸和元素尺寸联系起来，做到自适应。

auto: 这个属性值是由浏览器自动计算的。

块级元素 `水平方向` 的 auto 属性值，当父元素的尺寸在改变的时候，该元素的宽度也会随着改变。然而如果 `垂直方向` 上是 auto 的话，那么就是 0，因为垂直方向上是被设计成可以无限扩展的，内容越多浏览器便产生滚动条来扩展，所以垂直方向找不到一个计算基准，便成了 0。

auto 注意事项: 当该元素被设为浮动时，该元素的 width 就变成了内容的宽度了，由内容撑开，也就是所谓的有了包裹性。`overflow | position: absolute | float: left/right` 都可以产生包裹性，替换元素也同样具有包裹性。在具有包裹性的元素上想利用 width: auto; 来让元素宽度自适应浏览器宽度是不行的。

### 浮动布局

浮动布局的核心就是让元素脱离文档流，然后使用 width/height，margin/padding将元素定位。

<!-- TODO: 完善 -->
如下为圣杯布局的例子，左右侧边栏定宽并浮动，中间内容放最后不浮动并设置相应的外边距（或者 overflow: hidden 或者 张鑫旭自适应！！！），由于中间部分的 width: auto 为默认值，所以便可以实现自适应的效果。

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>宽度自适应布局</title>
        <style>
            body {
              margin: 0;
            }

            .clearfix::after {
              content: " ";

              display: table;

              clear: both;
            }

            .wrap {
              background: #D66464;
            }

            .left {
              float: left;

              width: 100px;
              height: 180px;

              background: #00f;
            }

            .right {
              float: right;

              width: 150px;
              height: 200px;

              background: #0f0;
            }

            .center {
              height: 150px;

              margin: 0 160px 0 110px;

              background: #FFFFFF;
            }
        </style>
    </head>
    <body>
        <div class="wrap clearfix">
            <div class="left">left，宽度固定，高度可固定也可以由内容撑开</div>
            <div class="right">right，宽度固定，高度可固定也可以由内容撑开</div>
            <div class="center">center，可以自适应浏览器宽度，高度可固定也可以由内容撑开</div>
        </div>
    </body>
    </html>

上述三列布局的双飞变种（就是在 HTML 中 center 部分也就是内容区提到最前面，内容先行渲染）， 这样做的好处就是在网络不好的时候，左右双翼能不能显示出来不要紧，先让主体内容出来。

技术思路讲解:

1) 既然 HTML 里面要让 center 放前面，为了让 left 跑到 center 前面，那么 center 也就必须设置浮动。

2) 由于 center 设置浮动了，产生了包裹性，所以为了让其实现自适应的效果，必须设置 width: 100%; 然后在父元素中设置 width: auto 和 两侧的 margin，让父元素实现宽度自适应，center 只是继承父元素的宽度。


    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>宽度自适应布局</title>
        <style>
            body {
                margin: 0;
            }

            .clearfix::after {
                content: " ";

                display: table;

                clear: both;
            }

            .wrap {
                margin-left: 100px;
                margin-right: 150px;

                background-color: #FBD570;
            }

            .center {
                float: left;

                width: 100%;
                height: 150px;

                background: #555;
            }

            .left {
                float: left;

                width: 100px;
                height: 180px;

                margin-left: calc(-100% - 100px);

                background: #00f;
            }

            .right {
                float: right;

                width: 150px;
                height: 200px;

                margin-right: -150px;

                background: #0f0;
            }
        </style>
    </head>
    <body>
        <div class="wrap clearfix">
            <div class="center">center，可以自适应浏览器宽度，高度可固定也可以由内容撑开</div>
            <div class="left">left，宽度固定，高度可固定也可以由内容撑开</div>
            <div class="right">right，宽度固定，高度可固定也可以由内容撑开</div>
        </div>
    </body>
    </html>

代码中我用到了 calc() 函数（特别注意减号两边需要有空格），如果本例中不使用 calc 函数，通过设置 wrap 左边距为 0, left 左边距 -100%, 然后在 center 中多加一层子块 div 设置 margin-left: 100px，可以达到同样的效果，见 `圣杯布局双飞float/index-1.html`。

### 普通流布局

基线基础知识学习: inline-block 默认是基线对齐的。基线根据有文字和没有文字两种情况是不同的:

1) 无文字: 基线是容器的 margin-bottom 下边缘。跟容器内部的元素没有一点的关系，就算内部元素与容器发生了外边距合并也没有任何的影响。

2) 有文字: 最后一行文字的下边缘，无论文字在什么子元素容器内或在什么位置都没有任何的关系。

使用 inline-block 进行圣杯布局, 自适应性是通过 .wrap 的 width: auto 和 center 的 width: 100% 实现的:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>宽度自适应布局</title>
        <style>
            body {
                margin: 0;
            }

            .wrap {
                margin-left: 100px;
                margin-right: 150px;

                font-size: 0;
                letter-spacing: -4px; /* 用于兼容safari，根据不同字体字号或许需要做一定的调整 */

                background-color: #fbd570;
            }

            .wrap * {
                font-size: 1rem;
                letter-spacing: normal;
            }

            .left {
                display: inline-block;

                vertical-align: top

                width: 100px;
                height: 180px;

                margin-left: -100px;

                background-color: #00f;
            }

            .center {
                display: inline-block;

                vertical-align: top;

                width: 100%;
                min-width: 150px;
                height: 150px;

                background-color: #b373da;
            }

            .right {
                display: inline-block;

                vertical-align: top;

                width: 150px;
                height: 200px;

                margin-right: -150px;

                background-color: #0f0;
            }

        </style>
    </head>
    <body>
        <div class="wrap">
            <div class="left">left，宽度高度固定</div>
            <div class="center">center，可以自适应浏览器宽度，高度固定</div>
            <div class="right">right，宽度高度固定</div>
        </div>
    </body>
    </html>

双飞实现的话，注意 html 的顺序是 `center>right>left` 并且改变左栏的 margin-left: calc(-100% - 100px) 就可以了（`center>left>right` 顺序的话就达不到预期的效果）。

如果不能使用 calc 的话，可以在 center 里面再加一层，跟浮动一样的处理方式。不过最简单的方式是通过使用 css3 的 box-sizing 属性来实现。

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>宽度自适应布局</title>
        <style>
            body {
                margin: 0;
            }

            .wrap {
                margin-right: 150px;

                font-size: 0;
                letter-spacing: -4px; /* 用于兼容safari，根据不同字体字号或许需要做一定的调整 */

                background-color: #fbd570;
            }

            .wrap * {
                font-size: 1rem;
                letter-spacing: normal;
            }

            .center {
                display: inline-block;

                vertical-align: top;

                width: 100%;
                min-width: 150px;
                height: 150px;

                box-sizing: border-box;
                padding-left: 100px;

                background-color: #b373da;
                background-clip: content-box;
                background-origin: content-box;
            }

            .left {
                display: inline-block;

                vertical-align: top;

                width: 100px;
                height: 180px;

                margin-left: -100%;

                background-color: #00f;
            }

            .right {
                display: inline-block;

                vertical-align: top;

                width: 150px;
                height: 200px;

                margin-right: -150px;

                background-color: #0f0;
            }
        </style>
    </head>
    <body>
        <div class="wrap">
            <div class="center">center，可以自适应浏览器宽度，高度固定</div>
            <div class="right">right，宽度高度固定</div>
            <div class="left">left，宽度高度固定</div>
        </div>
    </body>
    </html>

### 绝对定位

基础知识补充:

absolute 定位的基准是最近的 非static 定位父元素或者 inital containing block，而 fixed 是相对于 viewport 定位。

两种定位都会脱离普通流。

absolute 定位中 top: 0; left: 0; 的位置在父元素的 padding-box 左上角。

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>宽度自适应布局</title>
        <style>
            body {
                margin: 0;
            }

            .wrap {
                position: relative;

                height: 250px;

                margin-left: 100px;
                margin-right: 150px;

                background-color: #fbd570;
            }

            .left {
                position: absolute;
                top: 0;
                left: -100px;

                width: 100px;
                height: 180px;

                background-color: #00f;
            }

            .right {
                position: absolute;
                top: 0;
                right: 0;

                width: 150px;
                height: 200px;

                margin-right: -150px;

                background-color: #0f0;
            }

            .center {
                position: absolute;
                top: 0;
                left: 0;

                width: 100%;
                min-width: 150px;
                height: 150px;

                background-color: #b373da;
            }
        </style>
    </head>
    <body>
        <div class="wrap">
            <div class="left">left，宽度高度固定</div>
            <div class="center">center，可以自适应浏览器宽度，高度固定</div>
            <div class="right">right，宽度高度固定</div>
        </div>
    </body>
    </html>

双飞的话就改变一下 html 的顺序就可以了: `center>left>right`。

### 弹性盒子

[阮一峰老师的博文](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html) 已经详细地对弹性盒子语法进行了总结，下面的示例代码也是出自于他的博客文章。

基础知识点补充:

max-width: 768px 等价于 <768px

min-width: 768px 等价于 >=768px

圣杯布局代码如下:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>宽度自适应布局</title>
        <style>
            body {
                margin: 0;
            }

            .HolyGrail {
                display: flex;
                flex-direction: column;

                min-height: 100vh;
            }

            header,
            footer {
                flex: 1;
            }

            .HolyGrail-body {
                display: flex;
                flex: 1;
            }

            .HolyGrail-content {
                flex: 1;
            }

            .HolyGrail-nav,
            .HolyGrail-ads {
                flex: 0 0 12em;
            }

            @media (max-width: 768px) {
                .HolyGrail-body {
                    flex-direction: column;
                    flex: 1;
                }

                .HolyGrail-nav,
                .HolyGrail-ads,
                .HolyGrail-content {
                    flex: auto;
                }
            }
        </style>
    </head>
    <body class="HolyGrail">
        <header>...</header>
        <div class="HolyGrail-body">
            <nav class="HolyGrail-nav">
                vt. 切成方块 n. 骰子 vi. 掷骰子 n. (Dice)人名；(英)戴斯
            </nav>
            <main class="HolyGrail-content">
                DICE，全称EA Digital Illusions Creative Entertainment AB，又称EA DICE，是美国艺电旗下的一个游戏工作室，总部位于瑞典斯德哥尔摩。DICE最成功的游戏是其出品的战地系列游戏。关于游戏用具或赌具“dice”，请阅读“骰子”或“色子”词条
            </main>
            <aside class="HolyGrail-ads">
                挤他车以占领先地位(或有利位置)，紧逼抢挡 (两个驾驶员之间的)近距离追逐，抢拉追逐，紧逼抢挡，争夺有利位置的一场势均力敌的比赛
            </aside>
        </div>
        <footer>...</footer>
    </body>
    </html>

双飞的话，将 .HolyGrail-body 中的元素顺序改为 `.HolyGrail-content > .HolyGrail-nav > .HolyGrail-ads` 并且设置 .HolyGrail-nav 的 order: -1 即可实现。

### References

[茄果](http://www.cnblogs.com/qieguo/p/5421252.html)

[阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
