"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


/**
 * Saves a meal to the database and stores the associated image in the file system.
 * The meal's title is used to generate a unique slug, and the instructions are sanitized.
 * The image is saved to the `public/images` directory with the generated slug as the filename.
 * On success, redirects to the all meals page and revalidates it.
 * 
 * @param {FormData} formData - The form data containing the meal's details and image.
 * @throws {Error} If saving the meal fails.
 */
export async function shareMeal(formData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/meals`, {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong!');
    }
    revalidatePath("/meals");
  } catch (error) {
    throw new Error(error.message || 'Something went wrong!');
  }
  redirect("/meals");
}


  /**
   * Given a slug, retrieves the meal object from the API.
   * 
   * @param {string} slug - The slug of the meal to retrieve.
   * @return {Promise<Object>} The meal object if one exists, null otherwise.
   * @throws {Error} If the API request fails.
   */
export async function getMealData(slug) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/meals/${slug}`, {
    // next: { revalidate: 1 }, // Revalidate 
    // cache: 'no-store', // Don't cache this data
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch meal');
  }
  
  return response.json();
}

/**
 * Retrieves all meals from the API.
 * 
 * @return {Promise<Array>} An array of meal objects.
 * @throws {Error} If the API request fails.
 */

export async function getMealsData() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/meals`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch meals');
  }
  
  return response.json();
}
