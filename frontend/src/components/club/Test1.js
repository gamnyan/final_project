import React, { Fragment } from "react";
import ClubItemNavigation from "../Layout/ClubItemNavigation";
import { Col } from "react-bootstrap";
import SideNavigation from "../Layout/SideNavigation";

const Test1 = () => {
  return (
    <Fragment>
      <Col xs={2}>
        <SideNavigation />
      </Col>
      <Col xs={10}>
        <h2>test 1111</h2>
      </Col>
    </Fragment>
  );
};

export default Test1;
