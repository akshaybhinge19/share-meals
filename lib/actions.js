"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { saveMeal } from "./meals";

// checking if the text is valid or not
function isInvalidText(text) {
  return !text || text.trim() === "";
}

/**
 * Save a new meal into the database and revalidate the meals page to include the new meal.
 * @param {FormData} formData - The FormData object containing the submitted form data
 * @returns {Promise<Object>} - A Promise resolving to an object containing the message to be displayed
 * @throws {Error} - If there was an error saving the meal
 */
export async function shareMeal(formData) {
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
    console.error("error occurred while saving the meal", error);
    throw new Error("Failed to save the meal");
  }
  redirect("/meals");
}
