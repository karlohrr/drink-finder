import React from "react";
import DrinkCard from "./DrinkCard";

function DrinkList(props) {
  const drinks = props.drinks;
  if (!drinks || drinks.length === 0) {
    return null;
  }

  const drinkCards = drinks.map((drink) => {
    return (
      <DrinkCard
        drink={drink}
        key={drink.drinkID}
        selectFn={props.detailsGetter}
      ></DrinkCard>
    );
  });

  return (
    <div className="container">
      <div className="row">
        {props.header}
        {drinkCards}
      </div>
    </div>
  );
}

export default DrinkList;
