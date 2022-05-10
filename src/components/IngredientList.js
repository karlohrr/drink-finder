import React, { useEffect, useState } from "react";
import { config } from "../config.js";
import Select from "react-select";

function IngredientList(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fullURL = `${config.baseURL}list.php?i=list`;
    fetch(fullURL)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setIngredients(
            result.drinks.map((n) => {
              return { value: n.strIngredient1, label: n.strIngredient1 };
            })
          );
        },
        (error) => {
          setIsLoaded(false);
          setError(error);
        }
      );
  }, []);

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
          onChange={props.onChange}
        ></Select>
      </div>
    );
  }
}

export default IngredientList;
