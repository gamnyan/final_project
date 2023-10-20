import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";

const homeSection2 = () => {
  return (
    <Fragment>
      <Container>
        <div className="wrap">
          <Row>
            <Col>
              <Container>
                <div className="area1"></div>
              </Container>
            </Col>
            <Col>
              <Container>
                <div className="area2"></div>
              </Container>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
}; // homeSection2

export default homeSection2;
