// app/api/meals/route.js - Main API route for meal operations
import { NextResponse } from "next/server";
import { getMeals, getMeal, saveMeal } from "@/lib/meals";

export async function GET(request) {
  try {
    // Check if there's a slug parameter for single meal retrieval
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");

    if (slug) {
      // Get single meal if slug is provided
      const meal = getMeal(slug);

      if (!meal) {
        return NextResponse.json(
          { message: "Meal not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(meal);
    } else {
      // Get all meals
      const meals = await getMeals();
      return NextResponse.json(meals);
    }
  } catch (error) {
    console.error("Error retrieving meals:", error);
    return NextResponse.json(
      { message: "Failed to retrieve meals", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Validate required fields
    const requiredFields = [
      "title",
      "summary",
      "instructions",
      "name",
      "email",
    ];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check for image
    if (!formData.get("image")) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    // Create meal object from formData
    const meal = {
      title: formData.get("title"),
      summary: formData.get("summary"),
      instructions: formData.get("instructions"),
      creator: formData.get("name"),
      creator_email: formData.get("email"),
      image: formData.get("image"),
    };

    await saveMeal(meal);

    return NextResponse.json(
      { message: "Meal saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return NextResponse.json(
        {
          message: "Meal with this title already exists",
          error: error.message,
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Failed to save meal", error: error.message },
      { status: 500 }
    );
  }
}
