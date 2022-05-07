import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import IngredientList from "./components/IngredientList";
import GetDrinksButton from "./components/GetDrinksButton";
import { config } from "./config.js";
import DrinkList from "./components/DrinkList";
import "bootstrap/dist/css/bootstrap.min.css";
import DrinkDetails from "./components/DrinkDetails";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIngredient: null,
      drinks: null,
      searchedIngredient: null,
      selectedDrink: null,
      showDetails: false,
    };
  }

  ingredientSelect = (selectedIngredient) => {
    this.setState({ selectedIngredient });
  };

  getDrinkDetails = (drinkID) => {
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
          this.setState({
            selectedDrink,
            showDetails: true,
          });
        },
        (error) => {
          console.log("Could not get drink details");
        }
      );
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
              showDetails: false,
            });
          },
          (error) => {
            console.log("Could not get drinks");
          }
        );
    }
  };

  toggleView = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };

  render() {
    const ingredient = this.state.searchedIngredient;
    const drink = this.state.selectedDrink;
    const drinkHeader = ingredient ? <h2>Drinks using {ingredient}</h2> : null;

    const drinkDetails = drink ? (
      <DrinkDetails drink={drink}></DrinkDetails>
    ) : null;

    const content =
      this.state.showDetails === true ? (
        drinkDetails
      ) : (
        <DrinkList
          header={drinkHeader}
          drinks={this.state.drinks}
          detailsGetter={this.getDrinkDetails}
        ></DrinkList>
      );

    return (
      <div>
        <IngredientList onChange={this.ingredientSelect}></IngredientList>
        <div className="container">
          <GetDrinksButton onClick={this.getDrinks}></GetDrinksButton>
          <button className="btn btn-secondary" onClick={this.toggleView}>
            {}Toggle view
          </button>
        </div>
        {content}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
