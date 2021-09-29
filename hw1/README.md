## 圖片來源:Unsplash
---
## CSS
---
<ol>
<li>當鼠標在圖片之上時，圖片會放大並有紅色的邊框</li>

---
```
.images:hover{
    transform:scale(1.05,1.05);
    transition:all 1s ease-out;
    border:solid 3px red;
    overflow: hidden;
}
```
---

<li>當鼠標在目錄之上時，字會改變顏色</li>

---
```
nav a:hover{
    color:blueviolet;
}
```
---

<li>背景顏色使用漸層</li>

---
```
.background{
    background:linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
}
```
---

</ol>