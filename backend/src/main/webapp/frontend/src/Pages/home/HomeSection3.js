import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";

const homeSection3 = () => {
  return (
    <Fragment>
      <Container>
        <h2>Lorem ipsum dolor sit amet, consectetur</h2>
        <Row>
          <Col>
            <div className="content">
              <div className="area1"></div>
              <div className="area2"></div>
            </div>
          </Col>
          <Col>
            <div className="content">
              <div className="area1"></div>
              <div className="area2"></div>
            </div>
          </Col>
        </Row>
        <button>More +</button>
      </Container>
    </Fragment>
  );
}; // homeSection3

export default homeSection3;
