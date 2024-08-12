let menuBtn = document.querySelector(".menuBtn");
let closeBtn = document.querySelector(".closeBtn");
let menu = document.querySelector("nav");

menuBtn.onclick = function () {
  menuBtn.style.display = "none";
  closeBtn.style.display = "flex";
  menu.style.left = "0";
  let overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);
};
closeBtn.onclick = function () {
  closeBtn.style.display = "none";
  menuBtn.style.display = "flex";
  menu.style.left = "-65%";
  document.querySelector(".overlay").remove();
};

let counter = document.querySelector(".counter");

let minus = document.querySelector(".minus");
let plus = document.querySelector(".plus");
let num = document.querySelector(".num");

plus.onclick = function () {
  num.innerHTML++;
};
minus.onclick = function () {
  num.innerHTML--;
  if (num.innerHTML <= "0") {
    num.innerHTML = "0";
  }
};

let add = document.querySelector(".add");
add.addEventListener("click", (e) => {
  counter.textContent = num.textContent;
  counter.classList.add("active");
});

let container = document.querySelector("header .container");
let infoProduct = document.querySelector(".infoProduct");
let cart = document.querySelector(".cart");
let cartCounter = 0;

cart.addEventListener("click", (e) => {
  if (cartCounter === 0) {
    counter.classList.remove("active");

    // box content => (cart name + theProduct)
    let box = document.createElement("div");
    box.className = "box";

    // adresse
    let p = document.createElement("p");
    p.textContent = "Cart";
    box.appendChild(p);

    // box all info
    let theProduct = document.createElement("div");
    theProduct.className = "the-product";
    box.appendChild(theProduct);

    // empty text
    if (counter.textContent === "") {
      let emptyText = document.createElement("p");
      emptyText.className = "empty-text";
      emptyText.textContent = "Your cart is empty.";
      theProduct.appendChild(emptyText);
    }

    // the box of product when not empty content => (info box + checkout btn)
    else {
      let product = document.createElement("div");
      product.className = "product";
      theProduct.appendChild(product);

      // [1] the info box content => (img + information of product price + remove)
      let info = document.createElement("div");
      info.className = "info";
      product.appendChild(info);

      // [a] img of information of product
      let imgProduct = document.createElement("img");
      imgProduct.className = "img-product";
      let images = document.querySelectorAll(".thumbnail .image img");
      images.forEach((img) => {
        if (img.className === "active") imgProduct.src = img.src;
      });
      info.appendChild(imgProduct);

      // [b] product Info Price of information of product (text + calc)
      let productInfoPrice = document.createElement("div");
      productInfoPrice.className = "product-info-price";
      info.appendChild(productInfoPrice);
      // [1-b] image text
      let imgText = document.createElement("p");
      imgText.textContent = "Fall Limited Edition Sneakers";
      productInfoPrice.appendChild(imgText);
      // [2-b] calculate the price of product
      let calcPrice = document.createElement("div");
      calcPrice.className = "calc-price";
      productInfoPrice.appendChild(calcPrice);
      // the total price
      let thePrice = document.querySelector(".thePrice");
      let num = document.querySelector(".num");
      // the of calculation price and the num of product
      let calc = document.createElement("span");
      calc.textContent = `${thePrice.textContent} x ${num.textContent}`;
      calcPrice.appendChild(calc);
      // the final result
      let calcResult = document.createElement("span");
      calcResult.className = "result";
      let result = +thePrice.textContent * +num.textContent;
      calcResult.textContent = ` $${result}`;
      calcPrice.appendChild(calcResult);

      // [c] remove product
      let removeImg = document.createElement("img");
      removeImg.className = "delete";
      removeImg.src = "./images/icon-delete.svg";
      info.appendChild(removeImg);

      // [2] checkout btn
      let checkout = document.createElement("button");
      checkout.className = "checkout";
      checkout.textContent = "Checkout";
      product.appendChild(checkout);
    }

    container.appendChild(box);
    cartCounter++;
  } else {
    document.querySelector(".box").remove();
    cartCounter = 0;
  }
});

let divOfImage = document.querySelectorAll(".thumbnail .image");
let images = document.querySelectorAll(".thumbnail .image img");
let arrSrcImage = [
  "image-product-1",
  "image-product-2",
  "image-product-3",
  "image-product-4",
];
let arrImage = [];
let arr = [];
images.forEach((img) => {
  img.addEventListener("click", (e) => {
    divOfImage.forEach((el) => {
      el.classList.remove("active");
    });
    images.forEach((img) => {
      img.classList.remove("active");
      arrImage.push(img.src);
      arr.copyWithin(1, 1);
      // console.log(img);
    });
    // console.log(arrImage);
    e.currentTarget.classList.add("active");
    e.currentTarget.parentNode.classList.add("active");

    let overlay = document.createElement("div");
    overlay.className = "overlay";
    let box = document.createElement("div");
    box.className = "box-image";
    overlay.appendChild(box);

    let imageOverlay = document.createElement("img");
    imageOverlay.className = "image-overlay";
    // console.log(e.currentTarget.src);
    let regex = /image-product-[0-9]/gi;
    let num = e.currentTarget.src.toString().match(regex).toString();
    // console.log(num[num.length - 1]);

    let convertStr = "";
    if (e.currentTarget.src.includes(`image-product-${num[num.length - 1]}`)) {
      e.currentTarget.src = `./images/image-product-${num[num.length - 1]}.jpg`;
      convertStr = `/images/image-product-${num[num.length - 1]}-thumbnail.jpg`;
      imageOverlay.src = e.currentTarget.src;
    }
    // console.log(convertStr);
    // console.log(e.currentTarget.src);
    box.appendChild(imageOverlay);
    let imgBoxs = document.createElement("div");
    imgBoxs.className = "img-boxs";
    box.appendChild(imgBoxs);
    let img = [];
    let count = 0;

    arrImage.forEach((el) => {
      if (count < 4) {
        let imgBox = document.createElement("div");
        imgBox.className = "img-box";
        imgBox.id = count;
        imgBoxs.appendChild(imgBox);
        img.push(imgBox);
        img.forEach((box) => {
          box.onclick = function () {
            img.forEach((box) => {
              box.classList.remove("active");
            });
            this.classList.add("active");
            // console.log(imageOverlay);

            let theSrc = this.children[0].src.split("-thumbnail").join("");
            // console.log(theSrc);

            imageOverlay.src = theSrc;
          };
        });

        let images = document.createElement("img");
        images.className = "small-images";
        images.src = el;

        imgBox.appendChild(images);
        // console.log(images.src.includes(convertStr));
        // console.log(images.parentElement);
        if (images.src.includes(convertStr)) {
          images.parentElement.classList.add("active");
          images.classList.add("active");
        }

        count++;
      }
    });
    // console.log(count);

    // remove overlay and img
    let remove = document.createElement("img");
    remove.className = "remove";
    remove.src = "/images/icon-close.svg";
    box.appendChild(remove);

    document.body.appendChild(overlay);

    let sliderImage = Array.from(
      document.querySelectorAll(".img-boxs .img-box img")
    );
    let slider = Array.from(document.querySelectorAll(".thumbnail .image img"));
    console.log(sliderImage);

    let currentSlider;
    sliderImage.forEach((img, index) => {
      if (img.classList.contains("active")) {
        currentSlider = index;
      }
    });
    console.log(currentSlider);

    let slideCount = sliderImage.length - 1;

    // left image
    let prevButton = document.createElement("div");
    prevButton.className = "image prevButton";
    let left = document.createElement("img");
    left.className = "left";
    left.src = "/images/icon-previous.svg";
    prevButton.appendChild(left);
    box.appendChild(prevButton);

    // right image
    let nextButton = document.createElement("div");
    nextButton.className = "image nextButton";
    let right = document.createElement("img");
    right.className = "left";
    right.src = "/images/icon-next.svg";
    nextButton.appendChild(right);
    box.appendChild(nextButton);

    prevButton.onclick = prevImage;
    nextButton.onclick = nextImage;

    function prevImage() {
      // console.log("prev");
      if (prevButton.classList.contains("disabled")) {
      } else {
        currentSlider--;
        checker();
      }
    }

    function nextImage() {
      // console.log("next");
      if (nextButton.classList.contains("disabled")) {
      } else {
        currentSlider++;
        checker();
      }
    }

    function checker() {
      removeAllActive();

      sliderImage[currentSlider].classList.add("active");
      sliderImage[currentSlider].parentElement.classList.add("active");

      document.querySelector(".image-overlay").src = `/images/image-product-${
        currentSlider + 1
      }.jpg`;

      // if the active is first
      if (currentSlider === 0) {
        prevButton.classList.add("disabled");
      } else {
        prevButton.classList.remove("disabled");
      }

      // if the active is last
      if (currentSlider === slideCount) {
        nextButton.classList.add("disabled");
      } else {
        nextButton.classList.remove("disabled");
      }
    }
    checker();

    function removeAllActive() {
      sliderImage.forEach((img) => {
        img.classList.remove("active");
        img.parentElement.classList.remove("active");
      });
    }
  });
});

document.addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target.className === "remove") {
    document.querySelector(".overlay").remove();
  }
  if (e.target.className === "delete") {
    document.querySelector(".product").remove();
    let emptyText = document.createElement("p");
    emptyText.className = "empty-text";
    emptyText.textContent = "Your cart is empty.";
    document.querySelector(".the-product").appendChild(emptyText);
    counter.textContent = "";
  }
  if (e.target.className === "checkout") {
    let overlay = document.createElement("div");
    overlay.className = "overlay";
    let box = document.createElement("div");
    box.className = "box-image";
    overlay.appendChild(box);

    let imageOverlay = document.createElement("img");
    imageOverlay.className = "image-overlay";
    // console.log(e.currentTarget.src);
    let regex = /image-product-[0-9]/gi;
    let num = e.currentTarget.src.toString().match(regex).toString();
    // console.log(num[num.length - 1]);

    let convertStr = "";
    if (e.currentTarget.src.includes(`image-product-${num[num.length - 1]}`)) {
      e.currentTarget.src = `./images/image-product-${num[num.length - 1]}.jpg`;
      convertStr = `/images/image-product-${num[num.length - 1]}-thumbnail.jpg`;
      imageOverlay.src = e.currentTarget.src;
    }
    box.appendChild(imageOverlay);
  }
});

let sliderImage = document.querySelector(".product");
let currentSlider = 1;

document.querySelector(".prevButton").onclick = prevImage;
document.querySelector(".nextButton").onclick = nextImage;

function prevImage() {
  // console.log("prev");
  if (document.querySelector(".prevButton").classList.contains("disabled")) {
  } else {
    currentSlider--;
    checker();
  }
}

function nextImage() {
  // console.log("next");
  if (document.querySelector(".nextButton").classList.contains("disabled")) {
  } else {
    currentSlider++;
    checker();
  }
  // console.log(document.querySelector(".img-product"));
}
let arrThumbnail = Array.from(
  document.querySelectorAll(".thumbnail .image img")
);
function checker() {
  sliderImage.src = `./images/image-product-${currentSlider}.jpg`;

  arrThumbnail.forEach((img) => {
    img.classList.remove("active");
    img.parentElement.classList.remove("active");
  });
  arrThumbnail[currentSlider - 1].classList.add("active");
  arrThumbnail[currentSlider - 1].parentElement.classList.add("active");

  // if the active is first
  if (currentSlider === 1) {
    document.querySelector(".prevButton").classList.add("disabled");
  } else {
    document.querySelector(".prevButton").classList.remove("disabled");
  }

  // if the active is last
  if (currentSlider === 4) {
    document.querySelector(".nextButton").classList.add("disabled");
  } else {
    document.querySelector(".nextButton").classList.remove("disabled");
  }
}
checker();
