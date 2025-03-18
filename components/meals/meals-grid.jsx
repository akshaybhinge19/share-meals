import classes from "./meals-grid.module.css";
import MealItem from "./meal-item";
import { getMealsData } from "@/lib/actions"

const MealsGrid = async () => {
  const meals = await getMealsData();
  return (
    <ul className={classes.meals}>
      {meals?.map((meal) => {
        return (
          <li key={meal.id}>
            <MealItem meal={meal} />
          </li>
        );
      })}
    </ul>
  );
};

export default MealsGrid;
