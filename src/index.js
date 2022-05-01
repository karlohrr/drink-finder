import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import IngredientList from "./components/IngredientList";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <IngredientList></IngredientList>;
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
