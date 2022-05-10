import React from "react";

function DrinkDetails(props) {
  const getIngredients = (drink) => {
    const maxNumbOfIngredients = 15;
    const namePrefix = "strIngredient";
    const measurePrefix = "strMeasure";
    let ingredients = [];
    for (let i = 1; i <= maxNumbOfIngredients; i++) {
      if (!drink[`${namePrefix}${i}`]) break;
      const ingName = drink[`${namePrefix}${i}`];
      const measurement = drink[`${measurePrefix}${i}`]
        ? `${drink[`${measurePrefix}${i}`]}`
        : "";
      ingredients.push(
        <tr key={ingName}>
          <td>{`${measurement}`}</td>
          <td>-</td>
          <td>{`${ingName}`}</td>
        </tr>
      );
    }
    return ingredients;
  };

  const drink = props.drink;
  const ingredientList = getIngredients(drink);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-md-6 col-lg-5 col-xl-4">
          <img
            className="drinkImg"
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
          ></img>
        </div>
        <div className="col-sm-6 col-md-6 col-lg-7 col-xl-8">
          <div>
            <h2 className="inline">{drink.strDrink}</h2> -{" "}
            <em>{drink.strAlcoholic}</em>
          </div>
          <div className="indent">
            <h4>Ingredients</h4>
            <div className="indent">
              <table>
                <tbody>{ingredientList}</tbody>
              </table>
            </div>
            <h4>Instructions</h4>
            <div className="indent">
              <p>{drink.strInstructions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrinkDetails;
