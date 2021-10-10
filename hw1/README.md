## 圖片來源:Unsplash
---
## Responsive Web Design(RWD)
---
<ol>
<li>區分視窗大小而改變排版
<p>例如:</p></li>

```
@media(orientation:portrait){
    ...
}

@media(orientation:landscape){
    ...
}
```

<li>在字體大小使用vw(螢幕可視寬度百分比)，使字體大小會隨視窗大小變動而變動，不會破壞排版。
<p>例如:</p></li>

```
font-size:5vw;
```
<li>把畫面分為相簿、預覽，以及展示窗格，每個區塊的寬度用vw(螢幕可視寬度百分比)控制，不會破壞排版。<p>例如:</p></li>

```
width:25vw;
```
<li>在圖片寬度使用vw(螢幕可視高度百分比)，使圖片大小會隨視窗大小變動而變動，不會破壞排版。<p>例如:</p></li>

```
width:10vw;
```
</ol>

---
## CSS
---
<ol>
<li>在相簿和預覽部分為了排版美觀加入卷軸<p>例如:</p></li>

```
overflow:scroll;
overflow-x:hidden;
overflow-y: auto;
```
#### 美化卷軸
```
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #ffffff; 
}

::-webkit-scrollbar-thumb {
  background: #312929; 
}

::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
```
<li>當鼠標在圖片之上時，圖片會些微放大並有邊框<p>例如:</p></li>

```
.preview-photo:hover{
    transform:scale(1.05,1.05);
    transition:all 0.5s;
    border:solid 1vh;
    border-image:#9b34eb;
}
```
<li>背景顏色使用漸層</li>

```
.background{
    background:linear-gradient(#E6DADA,#274046);
}
```
</ol>