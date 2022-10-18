class slideShow {
  slideNr = 1;
  constructor(option) {
    this.op = option;
    this.initialStuff();
    this.createNexAndPer();
    this.createDot();
    this.show(this.slideNr);
    this.automatic();
    this.mouseEvent();
    this.CreateHtmlDiv();
  }

  /* Check Input Item */
  initialStuff() {
    let { placeHolder, slider, currentSlider, auto } = this.op;

    if (!placeHolder) throw console.warn("Please Select a Slid Base");
    if (!slider) throw console.warn("Pls Select a Slide Show");
    /* if (Number.isInteger(auto)) auto = auto  else auto = false*/
    Number.isInteger(auto) && auto > 0
      ? (this.op.auto = auto * 1000)
      : (this.op.auto = false);

    this.pic = [...slider.children].filter((e) => e.classList.contains("slid"));

    /* Message */
    console.log(
      `%c SlidShow hat ${this.pic.length} Bilder , mit ${
        this.op.auto / 1000
      } second Timer show`,
      "color:lime"
    );
  }

  /* Create HTML Side */
  CreateHtmlDiv() {
    let { placeHolder: base, slider: picS, pic } = this.op;
    base.style.overflow = "hidden";
    base.style.position = "relative";
    picS.style.width = this.pic.length * 100 + "%";

    this.width = parseInt(getComputedStyle(base).width.replace("px", ""));

    pic.forEach((element) => {
      element.style.width = `${this.width}px`;
      element.style.height = "100%";
    });
  }

  /* Create Button Next and Prevents */
  createNexAndPer() {
    /* Check the Link for more Info https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML?retiredLocale=de */
    this.op.placeHolder.insertAdjacentHTML(
      "beforeend",
      `<span class="next">&rarr;</span>
      <span class="prev">&larr;</span>
       `
    );

    document
      .querySelector(".next")
      .addEventListener("click", () => this.nCounter(++this.slideNr));
    document
      .querySelector(".prev")
      .addEventListener("click", () => this.nCounter(--this.slideNr));
  }

  /* Create Dots under slideShow */
  createDot() {
    let { placeHolder: place, slider } = this.op;
    /*[...slider.children].map()*/
    let dot = this.pic.map(
      (item, index) => `<span class='dot' data-select='${index + 1}'></span>`
    );

    let dotHolder = document.createElement("div");
    dotHolder.classList.add("dotHolder");
    dotHolder.innerHTML = dot.join(""); // `${dot.join("")}`;

    place.after(dotHolder);

    let dots = document.querySelectorAll(".dot");

    document.querySelector(`.dot[data-select="1"]`).classList.add("active");

    /* add Click Event on Dots */
    dots.forEach((element) => {
      /*e.target.getAttribute('data-select') Or e.target.dataset.select */
      element.addEventListener("click", (e) => {
        this.nCounter(e.target.dataset.select);
      });
    });
  }

  /*  */
  nCounter = (n) => {
    this.slideNr = parseInt(n);
    // console.log(this.slideNr);
    this.stopInterval();
    this.show(this.slideNr);
  };

  /* Manual SlideShow */
  show(num) {
    if (num > this.pic.length) this.slideNr = 1;
    else if (num < 1) this.slideNr = this.pic.length;
    let x = parseInt(this.width) * (this.slideNr - 1);

    document.querySelector(".dot.active").classList.remove("active");
    document
      .querySelector(`.dot[data-select="${this.slideNr}"]`)
      .classList.add("active");

    this.op.slider.style.marginLeft = -x + "px";
  }

  /* Automatic SlidShow */
  automatic() {
    if (!this.op.auto) return;

    this.intervalId = setInterval(
      () => this.show((this.slideNr += 1)),
      this.op.auto
    );
  }

  /*  */
  stopInterval() {
    clearInterval(this.intervalId);
    this.automatic();
  }

  /* MouseHover on slidShow */
  mouseEvent() {
    this.op.slider.addEventListener("mouseenter", () => {
      clearInterval(this.intervalId);
    });

    this.op.slider.addEventListener("mouseout", () => {
      this.automatic();
    });
  }
}

/* Enter your Data Here */

new slideShow({
  placeHolder: document.querySelector(".slideBase"),
  slider: document.querySelector(".slidShow"),
  pic: document.querySelectorAll(".slid"),
  auto: parseInt(
    document.querySelector(".slideBase").getAttribute("data-auto")
  ), //Timer
});
