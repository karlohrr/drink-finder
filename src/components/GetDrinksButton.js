import React from "react";

function GetDrinksButton(props) {
  return (
    <button className="btn btn-primary" onClick={props.onClick}>
      Get Drinks
    </button>
  );
}

export default GetDrinksButton;
