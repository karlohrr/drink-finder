import React from "react";
import { config } from "../config.js";

class GetDrinksButton extends React.Component {
  render() {
    return (
      <div className="container">
        <button className="btn btn-primary" onClick={this.props.onClick}>
          Get Drinks
        </button>
      </div>
    );
  }
}

export default GetDrinksButton;
