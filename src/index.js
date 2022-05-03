import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import IngredientList from "./components/IngredientList";
import GetDrinksButton from "./components/GetDrinksButton";
import { config } from "./config.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIngredient: null,
      drinks: null,
    };
  }

  ingredientSelect = (selectedIngredient) => {
    this.setState({ selectedIngredient });
  };

  getDrinks = () => {
    const ingredient = this.state.selectedIngredient?.value ?? null;
    let message;
    if (!ingredient) {
      message = "no ingredient selected.";

      this.setState({
        drinks: message,
      });
    } else {
      message = `getting drinks for ingredient: ${ingredient}`;
      let fullURL = `${config.baseURL}filter.php?i=${ingredient}`;
      fetch(fullURL)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then(
          (result) => {
            this.setState({
              drinks: result.drinks[0].strDrink,
            });
            console.log(result.drinks[0]);
          },
          (error) => {
            console.log("shit broke");
          }
        );
    }
  };

  render() {
    return (
      <div>
        <IngredientList onChange={this.ingredientSelect}></IngredientList>
        <GetDrinksButton onClick={this.getDrinks}></GetDrinksButton>
        <div>{this.state.drinks}</div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
