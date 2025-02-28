import { Suspense } from "react";
import Link from "next/link";
import classes from "./page.module.css";

import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import Loading from "./loading-out";

// TODO: implement this in seperate component
// to wait to render other content which is not having dependency on Meals
const Meals = async () => {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
};

const MealsPage = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipe and cook it. It is easy and fun!</p>
        <p className={classes.cta}>
          <Link href={"/meals/share"}>Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        {/* loading state as fallback while fetching meals */}
        <Suspense fallback={<Loading />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
