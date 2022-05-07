import React from "react";

class DrinkCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const drink = this.props.drink;

    return (
      <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3">
        <h3 className="drinkName">{drink.name}</h3>
        <a ref={this.myRef} onClick={() => this.props.selectFn(drink.drinkID)}>
          <img className="drinkImg" src={drink.imgThumb}></img>
        </a>
      </div>
    );
  }
}

export default DrinkCard;
