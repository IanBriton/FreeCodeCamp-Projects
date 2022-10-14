"use strict";

//Images
const images = [
  {
    id: 1,
    image: "./Images/Image-1.jpg",
  },
  {
    id: 2,
    image: "Images/Image-2.jpg",
  },
  {
    id: 3,
    image: "Images/Image-3.jpg",
  },
  {
    id: 4,
    image: "./Images/Image-4.jpg",
  },
  {
    id: 5,
    image: "./Images/Image-5.jpg",
  },
  {
    id: 5,
    image: "./Images/Image-5.jpg",
  },
  {
    id: 6,
    image: "./Images/Image-6.jpg",
  },
  {
    id: 7,
    image: "./Images/Image-6.jpg",
  },
  {
    id: 8,
    image: "./Images/Image-8.jpg",
  },
  {
    id: 9,
    image: "./Images/Image-9.jpg",
  },
  {
    id: 10,
    image: "./Images/Image-10.jpg",
  },
];
//Button Selection
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const btn = document.querySelectorAll(".btn");

let currentItem = 0;

window.addEventListener("DOMContentLoaded", () => {
  showImage(currentItem);
  // btnLeft.classList.add("hidden");
  // console.log("All the DOM content has been loaded");
});

//Div for rendering random images
const imageSpace = document.querySelector(".slide-image");

const showImage = (imageNo) => {
  const item = images[imageNo];
  imageSpace.src = item.image;
};

btn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const currentBtn = e.target.classList;
    if (currentBtn.contains("btn-left")) {
      currentItem--;
      if (currentItem < 0) {
        currentItem = images.length - 1;
        // btnLeft.classList.add("hidden");
      }
      showImage(currentItem);
    }
    if (currentBtn.contains("btn-right")) {
      currentItem++;
      if (currentItem > images.length - 1) {
        currentItem = 0;
        // btnRight.classList.add("hidden");
      }
      showImage(currentItem);
    }
  });
});
