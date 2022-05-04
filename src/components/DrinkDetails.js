import React from "react";

class DrinkDetails extends React.Component {
  getIngredients(drink) {
    const maxNumbOfIngredients = 15;
    const namePrefix = "strIngredient";
    const measurePrefix = "strMeasure";
    let ingredients = [];
    for (let i = 1; i <= maxNumbOfIngredients; i++) {
      if (!drink[`${namePrefix}${i}`]) break;
      ingredients.push(
        <li key={drink[`${namePrefix}${i}`]}>{`${
          drink[`${namePrefix}${i}`]
        } - ${drink[`${measurePrefix}${i}`]}`}</li>
      );
    }
    return ingredients;
  }

  render() {
    const drink = this.props.drink;
    const ingredientList = this.getIngredients(drink);

    return (
      <div>
        <ul>{ingredientList}</ul>
      </div>
    );
  }
}

export default DrinkDetails;
