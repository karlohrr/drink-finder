import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import IngredientList from "./components/IngredientList";
import GetDrinksButton from "./components/GetDrinksButton";
import { config } from "./config.js";
import DrinkList from "./components/DrinkList";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIngredient: null,
      drinks: null,
      searchedIngredient: null,
    };
  }

  ingredientSelect = (selectedIngredient) => {
    this.setState({ selectedIngredient });
  };

  getDrinks = () => {
    const ingredient = this.state.selectedIngredient?.value ?? null;
    let message;
    if (!ingredient) {
      this.setState({
        drinks: null,
      });
    } else {
      this.setState({ searchedIngredient: ingredient });
      message = `getting drinks for ingredient: ${ingredient}`;
      let fullURL = `${config.baseURL}filter.php?i=${ingredient}`;
      fetch(fullURL)
        .then((res) => {
          return res.json();
        })
        .then(
          (result) => {
            this.setState({
              drinks: result.drinks.map((n) => {
                return {
                  name: n.strDrink,
                  imgThumb: n.strDrinkThumb,
                  drinkID: n.idDrink,
                };
              }),
            });
          },
          (error) => {
            console.log("Could not get drinks");
          }
        );
    }
  };

  render() {
    const ingredient = this.state.searchedIngredient;
    const drinkHeader = ingredient ? <h2>Drinks using {ingredient}</h2> : null;
    const noIngredientMsg =
      this.state.searchedIngredient && !this.state.drinks ? (
        <div>no ingredient selected</div>
      ) : null;

    return (
      <div>
        <IngredientList onChange={this.ingredientSelect}></IngredientList>
        <GetDrinksButton onClick={this.getDrinks}></GetDrinksButton>
        {noIngredientMsg}

        <DrinkList header={drinkHeader} drinks={this.state.drinks}></DrinkList>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
