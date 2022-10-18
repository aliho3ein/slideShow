# SlidShow

to use tis code add :

- **slideshow.css**
- **slideshow.js**

to ur project

---

use the class :

```html
<div class="slideBase" data-auto="3">
  <div class="slidShow">
    <div class="slid"></div>
    <div class="slid"></div>
    <div class="slid"></div>
    <div class="slid"></div>
    <div class="slid"></div>
  </div>
</div>
```

## Important !

- u have to add ur Image to class side as background-image !
  - u can use N Image in ur Project
- in data-auto , u can enter ur timer show as **second** or _0_ if u want no auto slider

---

## **if u want to add more than one slidShow**

- u have to add a class in js file like

```javascript
new slideShow({
  placeHolder: document.querySelector(".slideBase"),
  slider: document.querySelector(".slidShow"),
  pic: document.querySelectorAll(".slid"),
  auto: parseInt(
    document.querySelector(".slideBase").getAttribute("data-auto")
  ), //Timer
});
```

and change name of

- slideBase to ur base Div
- slidShow to ur Div with all pics inside
- slid to pic class
