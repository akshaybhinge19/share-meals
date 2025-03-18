
import { NextResponse } from 'next/server';
import { getMeal } from '@/lib/meals';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const meal = getMeal(slug);
    
    if (!meal) {
      return NextResponse.json(
        { message: 'Meal not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(meal);
  } catch (error) {
    console.error('Error retrieving meal:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve meal', error: error.message },
      { status: 500 }
    );
  }
}