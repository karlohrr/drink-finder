import React from "react";
import { config } from "../config.js";
import Select from "react-select";

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
          this.setState({
            isLoaded: true,
            ingredients: result.drinks.map((n) => {
              return { value: n.strIngredient1, label: n.strIngredient1 };
            }),
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
        <div className="container">
          <h2>Select an Ingredient</h2>
          <Select
            name="ingredients"
            options={ingredients}
            onChange={this.props.onChange}
          ></Select>
        </div>
      );
    }
  }
}

export default IngredientList;
