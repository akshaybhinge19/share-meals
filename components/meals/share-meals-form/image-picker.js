"use client";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";

import classes from "./image-picker.module.css";
import Image from "next/image";

const ImagePicker = ({ label, name, register, errors, control }) => {
  const [pickedImage, setPickedImage] = useState(null);
  const imageInput = useRef(null);
  const { ref, ...rest } = register(name, { required: true });

  /**
   * Simulates a click event on the hidden file input, which triggers the file
   * selection dialog for the user to select an image.
   */
  function handlePickClick() {
    imageInput?.current?.click();
  }

  /**
   * Handles the image change event, triggered when user selects an image
   * using the file input.
   * @param event - The change event emitted by the file input.
   * Event handler for when file reader has finished reading the selected image.
   * The file reader result is set as the picked image state.
   */
  function handleImageChange(event) {
    const file = event?.target?.files?.[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result) {
        setPickedImage(fileReader.result);
      }
    };
    fileReader.readAsDataURL(file);
  }

  /**
   * Clears the selected image and resets the file input value.
   * Sets the picked image state to null and clears the current value of the image input.
   */
  function handleClearSelection() {
    setPickedImage(null);
    imageInput.current.value = "";
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No Image selected!</p>}
          {pickedImage && (
            <div>
              <Image
                src={pickedImage}
                alt="The Image select by the user."
                fill
              />
              <button type="button" onClick={handleClearSelection}>
                X
              </button>
            </div>
          )}
        </div>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              className={classes.input}
              type="file"
              id={name}
              accept="image/png, image/jpeg"
              name={name}
              ref={(e) => {
                ref(e);
                imageInput.current = e;
              }}
              {...rest}
              onChange={(e) => {
                handleImageChange(e);
                field.onChange(e.target.files); // Pass the file object to react-hook-form
              }}
            />
          )}
        />
        <div className={classes.actions}>
          <button
            type="button"
            className={classes.button}
            onClick={handlePickClick}
          >
            Pick an Image
          </button>
          {errors[name] && <div>Image is required</div>}
        </div>
      </div>
    </div>
  );
};

export default ImagePicker;
