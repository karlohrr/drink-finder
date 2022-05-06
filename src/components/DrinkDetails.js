import React from "react";

class DrinkDetails extends React.Component {
  getIngredients(drink) {
    const maxNumbOfIngredients = 15;
    const namePrefix = "strIngredient";
    const measurePrefix = "strMeasure";
    let ingredients = [];
    for (let i = 1; i <= maxNumbOfIngredients; i++) {
      if (!drink[`${namePrefix}${i}`]) break;
      const ingName = drink[`${namePrefix}${i}`];
      const measurement = drink[`${measurePrefix}${i}`]
        ? `${drink[`${measurePrefix}${i}`]} - `
        : "";
      ingredients.push(<li key={ingName}>{`${measurement}${ingName}`}</li>);
    }
    return ingredients;
  }

  render() {
    const drink = this.props.drink;
    const ingredientList = this.getIngredients(drink);

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-5 col-xl-4">
            <img className="drinkImg" src={drink.strDrinkThumb}></img>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-7 col-xl-8">
            <h2>{drink.strDrink}</h2>
            <div className="detailsContent">
              <div>
                <h4>Ingredients</h4>
                <ul>{ingredientList}</ul>
              </div>
              <div>
                <h4>Instructions</h4>
                <p>{drink.strInstructions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DrinkDetails;
