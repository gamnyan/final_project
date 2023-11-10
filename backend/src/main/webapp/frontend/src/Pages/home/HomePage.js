import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HomeVisual from "./HomeVisual";
import HomeSection1 from "./HomeSection1";
import HomeSection2 from "./HomeSection2";
import HomeSection3 from "./HomeSection3";
import "../../css/homePage.css";

const HomePage = () => {
   return (
      <Fragment>
         <HomeVisual />
         <section id="shortCard-area">
            <Container>
               <h2>What is Lorem Ipsum?</h2>
               <Row>
                  <Col>
                     <HomeSection1 />
                  </Col>
                  <Col>
                     <HomeSection1 />
                  </Col>
                  <Col>
                     <HomeSection1 />
                  </Col>
               </Row>
            </Container>
         </section>

         <section id="section2-area">
            <HomeSection2 />
         </section>

         <section id="section3-area">
            <HomeSection3 />
         </section>
      </Fragment>
   );
};

export default HomePage;
