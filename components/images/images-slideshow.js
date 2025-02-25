"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import classes from "./images-slideshow.module.css";
import burgerImage from "@/assets/burger.jpg";
import curryImage from "@/assets/curry.jpg";
import dumplingsImage from "@/assets/dumplings.jpg";
import macncheeseImage from "@/assets/macncheese.jpg";
import pizzaImage from "@/assets/pizza.jpg";
import schnitzelImage from "@/assets/schnitzel.jpg";
import tomatoSaladImage from "@/assets/tomato-salad.jpg";

// TODO: move this to constants if possible
const images = [
  { src: burgerImage, alt: "A delicious, juicy berger" },
  { src: curryImage, alt: "A delicious, spicy curry" },
  { src: dumplingsImage, alt: "Steamed dumplings" },
  { src: macncheeseImage, alt: "Mac and Cheese" },
  { src: pizzaImage, alt: "A delicious pizza" },
  { src: schnitzelImage, alt: "A delicious schnitzel" },
  { src: tomatoSaladImage, alt: "A delicious tomato salad" },
];

const ImageSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => {
        return (
          <Image
            key={index}
            src={image.src}
            className={index === currentImageIndex ? classes.active : ""}
            alt={image.alt}
          />
        );
      })}
    </div>
  );
};

export default ImageSlideshow;
