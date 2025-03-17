import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
const db = sql("meals.db");

/**
 * Retrieves all meals from the database, sorted by id.
 * This function simulates a longer operation by waiting 2 seconds before
 * returning the meals.
 * @return {Object[]} An array of meal objects, each of which has `id`, `slug`,
 * `title`, `summary`, `instructions`, `image`, and `creator` properties.
 */
export async function getMeals() {
  await new Promise((res) => setTimeout(res, 2000));
  return db.prepare("SELECT * FROM meals").all();
}

/**
 * Given a slug, returns the meal object from the database with that slug.
 * If no such meal exists, returns null.
 * @param {string} slug - The slug of the meal to retrieve.
 * @return {Object|null} The meal object if one exists, null otherwise.
 */
export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

/**
 * Saves a meal to the database and stores the associated image in the file system.
 * The meal's title is used to generate a unique slug, and the instructions are sanitized.
 * The image is saved to the `public/images` directory with the generated slug as the filename.
 * 
 * @param {Object} meal - The meal object to save.
 * @param {string} meal.title - The title of the meal.
 * @param {string} meal.summary - A brief summary of the meal.
 * @param {string} meal.instructions - The cooking instructions for the meal.
 * @param {File} meal.image - The image file associated with the meal.
 * @param {string} meal.creator - The name of the person who created the meal.
 * @param {string} meal.creator_email - The email of the person who created the meal.
 * @throws {Error} If saving the image fails.
 */

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal?.image?.name?.split(".")?.pop();
  const fileName = `${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);

  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });
  meal.image = `/images/${fileName}`;

  db.prepare(
    `
      INSERT INTO meals 
        (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
      )
  `
  ).run(meal);
}
