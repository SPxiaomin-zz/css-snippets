## 块状元素的流体特性与自适应布局

就像放在容器中的水流一样，内容区域会随着margin, padding, border的出现自动填满剩余空间，这就是块状元素的流体特性。

然而，利用块状元素流体特性实现的自适应布局有个不足，就是，我们需要知道浮动或绝对定位内容的尺寸。

```html
.flow-box {
    width: 500px; background-color: #eee; overflow:auto; resize:horizontal;
}

.flow-content {
    margin-left: 150px;
}

<div class="flow-box">
    <img src="mm1.jpg" width="128" style="float:left;">
    <div class="flow-content"><img src="mm1.jpg" width="100%" height="190"></div>
</div>

<div class="flow-box">
    <img src="mm1.jpg" width="128" style="position:absolute;">
    <div class="flow-content"><img src="mm1.jpg" width="100%" height="190"></div>
</div>
```

三、元素的BFC特性与自适应布局

1. BFC元素简介与基本表现

BFC元素特性表现原则就是，内部子元素再怎么翻江倒海，翻云覆雨都不会影响外部的元素。所以，避免margin穿透啊，清除浮动什么的也好理解了。

什么触发bfc

float的值不为none。
overflow的值为auto,scroll或hidden。
display的值为table-cell, table-caption, inline-block中的任何一个。
position的值不为relative和static。

BFC特性很多，而我们这里，只关心一个，和float元素做相邻兄弟时候的表现。

会发现，普通流体元素BFC后，为了和浮动元素不产生任何交集，顺着浮动边缘形成自己的封闭上下文。

同时，元素原本的流体特性依然保留了。哈，这个很重要，也就是，虽然不与浮动交集，自动退避浮动元素宽度的距离，但，本身作为普通元素的流动性依然存在，反映在布局上就是自动填满除去浮动内容以外的剩余空间。哟，这不就是自适应布局嘛！！


2. BFC自适应布局模块间的间距

注意：我这里举margin这个例子，不是让大家这样使用，只是为了让大家可以深入理解BFC元素与浮动元素混排的特性表现。实际开发，我们完全没有必要对BFC元素设置margin, 因为又回到了流体布局，明明是固定的15像素间距，但是，每个布局都要写一个不同的margin值，完全没有重用价值。

不仅如此，我们还可以使用BFC元素的padding-left撑开间距（虽然margin-left作用鸡肋）。

我们可以使用浮动元素的margin-right或者padding-right轻松实现间距效果。间距是20像素，直接：

3. 与纯流体特性布局的优势

BFC自适应布局优势我总结了下面2点：

自适应内容由于封闭，更健壮，容错性强。比方说，内部clear:both不会与兄弟float产生矛盾。而纯流体布局，clear:both会让后面内容无法和float元素在一个水平上，产生布局问题。
自适应内容自动填满浮动以为区域，无需关心浮动元素宽度，可以整站大规模应用。而纯流体布局，需要大小不确定的margin/padding等值撑开合适间距，无法CSS组件化。

.float-left {
    float: left; margin-right: 20px;
}
.bfc-content {
    overflow: hidden; background-color: #beceeb;
}

4. BFC元素家族与自适应布局面面观

float:left 浮动元素本身BFC化，然而浮动元素有破坏性和包裹性，失去了元素本身的流体自适应性，因此，无法用来实现自动填满容器的自适应布局。

position:absolute 这个脱离文档流有些严重，过于清高，不跟普通小伙伴玩耍，我就不说什么了……

因此，float+overflow的自适应布局，我们可以在局部（你确定不会有什么被剪裁的情况下）很happy地使用。

display:inline-block会让元素尺寸包裹收缩，完全就不是我们想要的block水平的流动特性。大家应该知道，IE6/IE7浏览器下，block水平的元素设置display:inline-block元素还是block水平，也就是还是会自适应容器的可用宽度显示。于是，我们就阴差阳错得到一个比overflow:hidden更牛逼的声明，即BFC特性加身，又流体特性保留。
.float-left {
    float: left;
}
.bfc-content {
    display: inline-block;
}

display:table-cell 让元素表现得像单元格一样，IE8+以上浏览器才支持。跟display:inline-block一样，会跟随内部元素的宽度显示，看样子也是不合适的命。但是，单元格有个非常神奇的特性，就是你宽度值设置地再大，大到西伯利亚，实际宽度也不会超过表格容器的宽度。

因此，如果我们把display:table-cell这个BFC元素宽度设置很大，比方说3000像素。那其实就跟block水平元素自动适应容器空间效果一模一样了。除非你的容器宽度超过3000像素，实际上，一般web页面不会有3000像素宽的模块的。所以，要是你实在不放心，设个9999像素值好了！

.float-left {
    float: left;
}
.bfc-content {
    display: table-cell; width: 9999px;
}
看上去，好像还不错。但是，还是有两点制约，一是IE8+以上浏览器兼容，有些苦逼的团队还要管IE6；二是应付连续英文字符换行有些吃力（可以嵌套table-layout:fixed解决）。但是，总体来看，适用的场景要比overflow:hidden广博很多。

overflow:auto/hidden IE7+
display:inline-block IE6/IE7
display:table-cell IE8+

由于overflow有剪裁和出现滚动条等隐患，不适合作为整站通用类，

两栏或多栏自适应布局的通用类语句是（block水平标签，需配合浮动）：

.cell {
    display: table-cell; width: 9999px;
    *display: inline-block; *width: auto;
}

当然，由于和浮动元素合作，清除浮动还是要的，于是，就有了.fix + .l/.r + .cell的无敌组合，可以多栏，也可以无限嵌套。

如果是局部，且确认安全；或有连续英文字符换行的隐患，你也可以使用.fix + .l/.r + .ovh的无敌组合，可以多栏，也可以无限嵌套。
