import React from "react";

class DrinkList extends React.Component {
  render() {
    const drinks = this.props.drinks;
    if (!drinks || drinks.length == 0) {
      return null;
    }

    const drinkDivs = drinks.map((drink) => {
      return (
        <div
          key={drink.drinkID}
          className="col-sm-6 col-md-4 col-lg-3 col-xl-3"
        >
          <h3 className="drinkName">{drink.name}</h3>
          <a onClick={() => this.props.detailsGetter(drink.drinkID)}>
            <img className="drinkImg" src={drink.imgThumb}></img>
          </a>
          <div></div>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
          {this.props.header}
          {drinkDivs}
        </div>
      </div>
    );
  }
}

export default DrinkList;
