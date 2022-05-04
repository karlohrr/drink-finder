import React from "react";

class DrinkList extends React.Component {
  render() {
    const drinks = this.props.drinks;
    if (!drinks || drinks.length == 0) {
      return null;
    }

    const drinkDivs = drinks.map((drink) => {
      return (
        <div>
          <h2>{drink.name}</h2>
          <img src={drink.imgThumb}></img>
          <div>{drink.drinkID}</div>
          <div></div>
        </div>
      );
    });
    return <div>{drinkDivs}</div>;
  }
}

export default DrinkList;
