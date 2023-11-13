import React, { Fragment } from "react";

const HomeVisualItem = ({ thumbnail, title, desc }) => {
  return (
    <Fragment>
      <div className="visualItem">
        <img
          style={{ display: "block", width: "100%" }}
          src={require(`../../imgs/${thumbnail}`)}
          alt=""
        />
        <div className="text-area">
          <h1>{title}</h1>
          <p>{desc}</p>
        </div>
      </div>
    </Fragment>
  );
}; // homeVisualItem

export default HomeVisualItem;
