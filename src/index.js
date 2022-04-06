import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { config } from "./config.js";

class IngredientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      ingredients: [],
    };
  }

  componentDidMount() {
    let fullURL = `${config.baseURL}list.php?i=list`;
    fetch(fullURL)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            ingredients: result.drinks,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, ingredients } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading Ingredients...</div>;
    } else {
      return (
        <ul>
          {ingredients.map((ing) => (
            <li key={ing.strIngredient1}>{ing.strIngredient1}</li>
          ))}
        </ul>
      );
    }
  }
}
// ========================================

ReactDOM.render(<IngredientList />, document.getElementById("root"));
