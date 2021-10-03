## 圖片來源:Unsplash
---
## Responsive Web Design(RWD)
---
<ol>
<li>在字體大小使用vw，使字體大小會隨視窗大小變動而變動，不會破壞排版</li>

---
```
.description{
    font-family: Times;
    font-size:6vw;
    margin:0;
}
```
---
<li>在圖片寬度使用vh，使圖片大小會隨視窗大小變動而變動，不會破壞排版</li>

---
```
.images{
    display:inline-block;
    margin:auto;
    width:30vh;
}
```
---
</ol>

## CSS
---
<ol>
<li>當鼠標在圖片之上時，圖片會些微放大並有青色(aqua)的邊框</li>

---
```
.images:hover{
    transform:scale(1.05,1.05);
    transition:all 1s ease-out;
    border:solid 3vh #7FDBFF;
}
```
---
<li>當鼠標典籍圖片時，圖片放大且有漸層邊框</li>

---
```
.images:active{
    transform:scale(1.5,1.5);   
    transition:all sharp;
    border:solid 5vh transparent;
    border-image:linear-gradient(#BBD2C5,#536976,#292E49);
    border-image-slice:1;
}
```
---

<li>背景顏色使用漸層</li>

---
```
.background{
    background:linear-gradient(#E6DADA,#274046);
}
```
---

</ol>