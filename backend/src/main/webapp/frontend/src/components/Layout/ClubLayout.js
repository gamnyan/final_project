import React, { Fragment } from "react";
import SideNavigation from "./SideNavigation";
import { Col, Container, Row } from "react-bootstrap";
import ClubWrap from "./ClubWrap";
import ClubItemNavigation from "./ClubItemNavigation";
import { Outlet } from "react-router-dom";

const ClubLayout = (props) => {
  return (
    <Fragment>
      <Container style={{ width: "90%" }}>
        <Row style={{ width: "100%" }}>
          <Outlet />
        </Row>
      </Container>
    </Fragment>
  );
}; // clubLayOut

export default ClubLayout;
