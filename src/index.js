import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import IngredientList from "./components/IngredientList";
import GetDrinksButton from "./components/GetDrinksButton";
import { config } from "./config.js";
import DrinkList from "./components/DrinkList";
import "bootstrap/dist/css/bootstrap.min.css";
import DrinkDetails from "./components/DrinkDetails";

function App() {
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [drinks, setDrinks] = useState(null);
  const [searchedIngredient, setSearchedIngredient] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const ingredientSelect = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const getDrinkDetails = (drinkID) => {
    if (drinkID !== 0 && !drinkID) {
      // how'd you get here?
      return;
    }

    let fullURL = `${config.baseURL}lookup.php?i=${drinkID}`;
    fetch(fullURL)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          let selectedDrink = result.drinks[0];
          setSelectedDrink(selectedDrink);
          setShowDetails(true);
        },
        (error) => {
          console.log("Could not get drink details");
        }
      );
  };

  const getDrinks = () => {
    const ingredient = selectedIngredient?.value ?? null;
    let message;
    if (!ingredient) {
      setDrinks(null);
    } else {
      setSearchedIngredient(ingredient);
      message = `getting drinks for ingredient: ${ingredient}`;
      let fullURL = `${config.baseURL}filter.php?i=${ingredient}`;
      fetch(fullURL)
        .then((res) => {
          return res.json();
        })
        .then(
          (result) => {
            setDrinks(
              result.drinks.map((n) => {
                return {
                  name: n.strDrink,
                  imgThumb: n.strDrinkThumb,
                  drinkID: n.idDrink,
                };
              })
            );
            setShowDetails(false);
          },
          (error) => {
            console.log("Could not get drinks");
          }
        );
    }
  };

  const toggleView = () => {
    setShowDetails(!showDetails);
  };

  const ingredient = searchedIngredient;
  const drink = selectedDrink;
  const drinkHeader = ingredient ? <h2>Drinks using {ingredient}</h2> : null;

  const drinkDetails = drink ? (
    <DrinkDetails drink={drink}></DrinkDetails>
  ) : null;

  const content =
    showDetails === true ? (
      drinkDetails
    ) : (
      <DrinkList
        header={drinkHeader}
        drinks={drinks}
        detailsGetter={getDrinkDetails}
      ></DrinkList>
    );

  return (
    <div>
      <IngredientList onChange={ingredientSelect}></IngredientList>
      <div className="container">
        <GetDrinksButton onClick={getDrinks}></GetDrinksButton>
        <button className="btn btn-secondary" onClick={toggleView}>
          Toggle view
        </button>
      </div>
      {content}
    </div>
  );
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
