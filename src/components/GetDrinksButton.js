import React from "react";
import { config } from "../config.js";

class GetDrinksButton extends React.Component {
  render() {
    return (
      <button className="btn btn-primary" onClick={this.props.onClick}>
        Get Drinks
      </button>
    );
  }
}

export default GetDrinksButton;
