import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import IngredientList from "./components/IngredientList";
import GetDrinksButton from "./components/GetDrinksButton";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIngredient: null,
    };
  }

  ingredientSelect = (selectedIngredient) => {
    this.setState({ selectedIngredient });
    console.log(selectedIngredient);
  };

  getDrinks = () => {
    console.log("getting drinks");
  };

  render() {
    return (
      <div>
        <IngredientList onChange={this.ingredientSelect}></IngredientList>
        <GetDrinksButton></GetDrinksButton>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
