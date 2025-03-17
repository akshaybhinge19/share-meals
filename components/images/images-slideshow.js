"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { imagesConstants } from "./constants";
import classes from "./images-slideshow.module.css";

const images = [...imagesConstants];

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
