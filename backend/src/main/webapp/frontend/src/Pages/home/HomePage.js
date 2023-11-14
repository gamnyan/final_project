import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HomeVisual from "./HomeVisual";
import HomeSection1 from "./HomeSection1";
import HomeSection2 from "./HomeSection2";
import HomeSection3 from "./HomeSection3";
import "../../css/homePage.css";
import { useParams } from "react-router-dom";
import { ClubContextProvider } from "../../Store/Club-context";
import { ArticleContextProvider } from "../../Store/Article-context";
import { GalleryContextProvider } from "../../Store/Gallery-context";

const HomePage = () => {
  let { pageId, clubId } = useParams();
  return (
    <Fragment>
      <HomeVisual />
      <section id="shortCard-area">
        <Container>
          <h2>내가 가입한 클럽</h2>
          <Row>
            <Col>
              <ClubContextProvider>
                <HomeSection1 item={pageId} />
              </ClubContextProvider>
            </Col>

            {/*  <Col>
              <HomeSection1 />
            </Col>
            <Col>
              <HomeSection1 />
            </Col> */}
          </Row>
        </Container>
      </section>

      <section id="section2-area">
        <ArticleContextProvider>
          <HomeSection2 item={pageId} clubId={clubId} />
        </ArticleContextProvider>
      </section>

      <section id="section3-area">
        <GalleryContextProvider>
          <HomeSection3 item={pageId} clubId={clubId} />
        </GalleryContextProvider>
      </section>
    </Fragment>
  );
};

export default HomePage;
