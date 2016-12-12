图片宽度一直width:100%，依次点击3个按钮，结果随着margin, padding, border的出现，其可用宽度自动跟着减小，形成了自适应效果。就像放在容器中的水流一样，内容区域会随着margin, padding, border的出现自动填满剩余空间，这就是块状元素的流体特性。

然而，利用块状元素流体特性实现的自适应布局有个不足，就是，我们需要知道浮动或绝对定位内容的尺寸。

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
