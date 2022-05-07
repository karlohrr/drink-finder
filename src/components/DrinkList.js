import React from "react";
import DrinkCard from "./DrinkCard";

class DrinkList extends React.Component {
  render() {
    const drinks = this.props.drinks;
    if (!drinks || drinks.length == 0) {
      return null;
    }

    const drinkCards = drinks.map((drink) => {
      return (
        <DrinkCard
          drink={drink}
          key={drink.drinkID}
          selectFn={this.props.detailsGetter}
        ></DrinkCard>
      );
    });
    return (
      <div className="container">
        <div className="row">
          {this.props.header}
          {drinkCards}
        </div>
      </div>
    );
  }
}

export default DrinkList;
