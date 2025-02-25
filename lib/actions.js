"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { saveMeal } from "./meals";

// checking if the text is valid or not
function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  // const slug = formData.get("title").split(" ").join("-");
  // const slug = formData.get("title").replaceAll(" ", "-");
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.instructions) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid Input!",
    };
  }
  try {
    await saveMeal(meal);
    revalidatePath("/meals");
  } catch (error) {
    console.error("error occured while saving the meal", error);
    throw new Error("Failed to save the meal");
  }
  redirect("/meals");
}
