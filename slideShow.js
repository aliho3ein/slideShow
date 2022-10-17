class slideShow {
  slideNr = 1;
  constructor(option) {
    this.op = option;
    this.initialStuff(option);
    this.createNexAndPer();
    this.createDot();
    this.show(this.slideNr);
    this.automatic();
    this.mouseEvent();
    this.CreateHtmlDiv();
  }

  /* Check Input Item */
  initialStuff() {
    let { slider, currentSlider, auto } = this.op;
    if (!slider) throw console.warn("Pls Select a Slide Show");
    /* if (Number.isInteger(auto)) auto = auto  else auto = false*/
    Number.isInteger(auto) ? auto : (auto = false);
    this.pic = [...slider.children].filter((e) => e.classList.contains("slid"));
  }

  /* Create HTML Side */
  CreateHtmlDiv() {
    let { placeHolder: base, slider: picS, pic } = this.op;
    base.style.overflow = "hidden";
    base.style.position = "relative";
    picS.style.width = this.pic.length * 100 + "%";

    pic.forEach((element) => {
      element.style.width = `${this.op.baseWidth}px`;
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
        console.log(e.target.dataset.select);
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
    let x = parseInt(this.op.baseWidth) * (this.slideNr - 1);

    document.querySelector(".dot.active").classList.remove("active");
    document
      .querySelector(`.dot[data-select="${this.slideNr}"]`)
      .classList.add("active");

    this.op.slider.style.marginLeft = -x + "px";
  }

  automatic() {
    if (!this.op.auto) return;

    this.intervalId = setInterval(
      () => this.show((this.slideNr += 1)),
      this.op.auto
    );
  }

  stopInterval() {
    clearInterval(this.intervalId);
    this.automatic();
  }

  mouseEvent() {
    this.op.slider.addEventListener("mouseenter", () => {
      clearInterval(this.intervalId);
    });

    this.op.slider.addEventListener("mouseout", () => {
      this.automatic();
    });
  }
}

new slideShow({
  placeHolder: document.querySelector(".slideBase"),
  slider: document.querySelector(".slidShow"),
  pic: document.querySelectorAll(".slid"),
  baseWidth: 900, //Base Width
  auto: 3000, //Timer
});
