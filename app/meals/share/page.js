"use client";

import { useForm } from "react-hook-form";
import { shareMeal } from "@/lib/actions";
import MealsFormSubmit from "@/components/meals/share-meals-form/meals-form-submit";
import ImagePicker from "@/components/meals/share-meals-form/image-picker";
import FormInput from "@/components/meals/share-meals-form/form-input"
import FormTextArea from "../../../components/meals/share-meals-form/form-textarea"
import classes from "./page.module.css";

const Share = () => {
  const { register, handleSubmit, formState: { errors }, control, getValues} = useForm();
  async function onSubmit(data) {
    const formData = new FormData();
    
    // Adding text fields to FormData
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("instructions", data.instructions);
    
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    
    await shareMeal(formData);
  }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={classes.row}>
            <FormInput id={"name"} label={"Your name"} type={"text"} register={register} errors={errors} required={true}/>
            <FormInput id={"email"} label={"Your email"} type={"email"} register={register} errors={errors} required={true}/>
          </div>
          <FormInput id={"title"} label={"Title"} type={"text"} register={register} errors={errors} required={true}/>
          <FormInput id={"summary"} label={"Short Summary"} type={"text"} register={register} errors={errors} required={true}/>
          <FormTextArea id={"instructions"} label={"Instructions"} rows={10} register={register} errors={errors} required={true} className={'instructions'}/>
          {/* Image Picker */}
          <ImagePicker label={"Your Image"} name={"image"} register={register} errors={errors} control={control}/>
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
};

export default Share;
