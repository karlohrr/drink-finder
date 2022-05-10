import React from "react";

function DrinkCard(props) {
  const drink = props.drink;

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3">
      <h3 className="drinkName">{drink.name}</h3>
      <span onClick={() => props.selectFn(drink.drinkID)}>
        <img
          className="drinkImg"
          src={drink.imgThumb}
          alt={drink.strDrink}
        ></img>
      </span>
    </div>
  );
}

export default DrinkCard;
