import classes from "./meals-grid.module.css";
import MealItem from "./meal-item";

const MealsGrid = (props) => {
  const { meals } = props;
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
